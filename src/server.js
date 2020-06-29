import express from 'express';
import cors from 'cors';
import compress from 'compression';
import helmet from 'helmet';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';

import { UserApi, TraineeApi } from './dataSource';

export default class Server {
  constructor(config) {
    this.app = express();
    this.config = config;
  }

  getApplication() {
    return this;
  }

  bootstrap() {
    this.initHelmet();
    this.initCompress();
    this.initCors();

    return this;
  }

  initCors() {
    this.app.use(cors());
  }

  initCompress() {
    this.app.use(compress());
  }

  initHelmet() {
    this.app.use(helmet());
  }

  async setupApollo(schema) {
    const { app } = this;

    try {
      const server = new ApolloServer({
        ...schema,
        dataSources: () => ({
          userApi: new UserApi(),
          traineeApi: new TraineeApi(),
        }),
        context: ({ req }) => {
          if (req) {
            return { token: req.headers.authorization };
          }

          return {};
        },
        onHealthCheck: () => new Promise((resolve) => resolve('I am OK')),
      });
      server.applyMiddleware({ app });
      this.server = http.createServer(app);
      server.installSubscriptionHandlers(this.server);
      this.run();
    } catch (err) {
      console.error(err);
    }

    return this;
  }

  run() {
    const { port, env } = this.config;

    this.server.listen(port, () => {
      console.log(`server started on port ${port} (${env})`);
    });

    return this;
  }
}
