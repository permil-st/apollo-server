import { AuthenticationError, ValidationError } from 'apollo-server-express';

import pubsub from '../pubsub';
import { constants } from '../../lib';

export default {
  createTrainee: async (parent, args, context) => {
    const { traineeApi } = context.dataSources;
    const { name, email, password } = args.payload;

    try {
      const result = await traineeApi.createTrainee({ name, email, password });

      pubsub.publish(
        constants.subscriptions.TRAINEE_ADD,
        { addTrainee: result.data },
      );

      return result.data;
    } catch (err) {
      if (err.extensions.response.status === 422) {
        throw new ValidationError(err.extensions.response.body.message);
      }

      throw new AuthenticationError(err.extensions.response.body.message);
    }
  },
  updateTrainee: async (parent, args, context) => {
    const { traineeApi } = context.dataSources;
    const { name, email, password } = args.payload;

    try {
      const result = await traineeApi.updateTrainee({
        name, email, password, id: args.id,
      });

      pubsub.publish(
        constants.subscriptions.TRAINEE_UPDATE,
        { updateTrainee: result.data.id },
      );

      return result.data.id;
    } catch (err) {
      if (err.extensions.response.status === 422) {
        throw new ValidationError(err.extensions.response.body.message);
      }

      throw new AuthenticationError(err.extensions.response.body.message);
    }
  },
  deleteTrainee: async (parent, args, context) => {
    const { traineeApi } = context.dataSources;

    try {
      const result = await traineeApi.deleteTrainee(args.id);

      pubsub.publish(
        constants.subscriptions.TRAINEE_DELETE,
        { deleteTrainee: result.data.id },
      );

      return result.data.id;
    } catch (err) {
      if (err.extensions.response.status === 422) {
        throw new ValidationError(err.extensions.response.body.message);
      }

      throw new AuthenticationError(err.extensions.response.body.message);
    }
  },
};
