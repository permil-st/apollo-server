import { RESTDataSource } from 'apollo-datasource-rest';
import config from '../config/configrations';

class TraineeApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = config.serviceUrl;
  }
}

export default TraineeApi;
