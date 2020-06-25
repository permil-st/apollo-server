import { AuthenticationError, ValidationError } from 'apollo-server-express';

export default {
  loginUser: async (parent, args, context) => {
    const { email, password } = args.payload;
    const { userApi } = context.dataSources;

    try {
      const result = await userApi.loginUser({ email, password });
      return result.data;
    } catch (err) {
      if (err.extensions.response.status === 422) {
        throw new ValidationError(err.extensions.response.body.message);
      }

      throw new AuthenticationError(err.extensions.response.body.message);
    }
  },
};
