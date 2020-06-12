import { RESTDataSource } from 'apollo-datasource-rest';
import config from '../config/configrations';

class TraineeApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${config.serviceUrl}/api/trainee`;
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  getTrainee(options) {
    return this.get('/', options);
  }

  getTraineeById(id) {
    return this.get(`/${id}`);
  }

  createTrainee(payload) {
    return this.post('/', payload);
  }

  updateTrainee(payload) {
    return this.put('/', payload);
  }

  deleteTrainee(id) {
    return this.delete(`/${id}`);
  }
}

export default TraineeApi;
