import { AuthenticationError, ValidationError } from 'apollo-server-express';

export default {
  getAllTrainees: async (parent, args, context) => {
    const { traineeApi } = context.dataSources;
    const { skip, limit } = args;

    try {
      const result = await traineeApi.getTrainee({ skip, limit });
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
  getTrainee: async (parent, args) => {
    try {
      // const result = await traineeApi.getTraineeById(args.id);
      const result = {
        name: 'permil Garg',
        _id: '5eec5b8e5e765400520a66c6',
        originalId: args.id,
        email: 'garg.permil@successive.tech',
        role: 'trainee',
        createdAt: '2020-06-18T09:40:08.364Z',
      };
      return result;
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
