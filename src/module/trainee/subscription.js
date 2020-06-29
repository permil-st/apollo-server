import { constants } from '../../lib';
import pubsub from '../pubsub';

const { TRAINEE_ADD, TRAINEE_UPDATE, TRAINEE_DELETE } = constants.subscriptions;

export default {
  addTrainee: {
    subscribe: () => pubsub.asyncIterator([TRAINEE_ADD]),
  },
  updateTrainee: {
    subscribe: () => pubsub.asyncIterator([TRAINEE_UPDATE]),
  },
  deleteTrainee: {
    subscribe: () => pubsub.asyncIterator([TRAINEE_DELETE]),
  },
};
