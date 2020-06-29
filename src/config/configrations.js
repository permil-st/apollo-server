import { config } from 'dotenv';

config();

const configration = Object.freeze({
  port: process.env.PORT,
  env: process.env.ENV,
  serviceUrl: process.env.API_URL,
});

export default configration;
