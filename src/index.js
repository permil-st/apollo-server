import config from './config/configrations';
import schema from './module';
import Server from './server';

const server = new Server(config);
server.bootstrap().setupApollo(schema);
