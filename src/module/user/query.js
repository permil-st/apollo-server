import { AuthenticationError, ValidationError } from 'apollo-server-express';

export default {
  getMyProfile: async (parent, args, context) => {
    const { userApi } = context.dataSources;

    try {
      const result = await userApi.getMe();
      return result.data;
    } catch (err) {
      if (err.extensions.response.status === 422) {
        throw new ValidationError(err.extensions.response.body.message);
      }

      throw new AuthenticationError(err.extensions.response.body.message);
    }
  },
};
