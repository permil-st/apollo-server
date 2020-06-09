import express from 'express';
import cors from 'cors';
import compress from 'compression';
import helmet from 'helmet';
import { ApolloServer } from 'apollo-server-express';

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
        onHealthCheck: () => new Promise((resolve) => resolve('I am OK')),
      });
      server.applyMiddleware({ app });
      this.run();
    } catch (err) {
      console.error(err);
    }


    return this;
  }

  run() {
    const { port, env } = this.config;
    const { app } = this;

    app.listen(port, (err) => {
      if (err) {
        return console.error(err);
      }

      return console.log(`server started on port ${port} (${env})`);
    });

    return this;
  }
}
