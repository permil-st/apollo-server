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
      const { response } = err.extensions;
      const { message } = response.body;

      if (response.status === 422) {
        throw new ValidationError(message);
      }

      throw new AuthenticationError(message);
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
        {
          updateTrainee: {
            originalId: result.data.id, name, email, password,
          },
        },
      );

      return result.data.id;
    } catch (err) {
      const { response } = err.extensions;
      const { message } = response.body;

      if (response.status === 422) {
        throw new ValidationError(message);
      }

      throw new AuthenticationError(message);
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
      const { response } = err.extensions;
      const { message } = response.body;

      if (response.status === 422) {
        throw new ValidationError(message);
      }

      throw new AuthenticationError(message);
    }
  },
};
