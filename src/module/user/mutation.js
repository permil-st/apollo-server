import { AuthenticationError, ValidationError } from 'apollo-server-express';

export default {
  loginUser: async (parent, args, context) => {
    const { email, password } = args.payload;
    const { userApi } = context.dataSources;

    try {
      const result = await userApi.loginUser({ email, password });
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
