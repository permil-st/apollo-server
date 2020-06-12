import { RESTDataSource } from 'apollo-datasource-rest';
import config from '../config/configrations';

class UserApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${config.serviceUrl}/api/user`;
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  loginUser(payload) {
    return this.post('/login', payload);
  }

  getMe() {
    return this.get('/me');
  }
}

export default UserApi;
