import { AuthenticationError, ValidationError } from 'apollo-server-express';

export default {
  getAllTrainees: async (parent, args, context) => {
    const { traineeApi } = context.dataSources;
    const { skip, limit } = args;

    try {
      const result = await traineeApi.getTrainee({ skip, limit });
      return result.data;
    } catch (err) {
      if (err.extensions.response.status === 422) {
        throw new ValidationError(err.extensions.response.body.message);
      }

      throw new AuthenticationError(err.extensions.response.body.message);
    }
  },
  getTrainee: async (parent, args, context) => {
    const { traineeApi } = context.dataSources;

    try {
      const result = await traineeApi.getTraineeById(args.id);
      return result.data;
    } catch (err) {
      if (err.extensions.response.status === 422) {
        throw new ValidationError(err.extensions.response.body.message);
      }

      throw new AuthenticationError(err.extensions.response.body.message);
    }
  },
};
