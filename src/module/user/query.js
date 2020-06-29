import { AuthenticationError, ValidationError } from 'apollo-server-express';

export default {
  getMyProfile: async (parent, args, context) => {
    const { userApi } = context.dataSources;

    try {
      const result = await userApi.getMe();
      return result.data;
    } catch (err) {
      const { response } = err.extensions;
      const { message } = response.body;

      if (response.status === 422) {
        throw new ValidationError(message);
      }

      throw new AuthenticationError(message);
    }
  },
};
