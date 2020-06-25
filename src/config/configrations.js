import { config } from 'dotenv';

config();

const configration = Object.freeze({
  port: process.env.PORT,
  env: process.env.ENV,
  serviceUrl: 'https://express-training.herokuapp.com',
});

export default configration;
