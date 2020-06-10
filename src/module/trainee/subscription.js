import constants from '../../constants/constants';
import pubsub from '../pubsub';

export default {
  addTrainee: {
    subscribe: () => pubsub.asyncIterator([constants.subscriptions.TRAINEE_ADD]),
  },
  updateTrainee: {
    subscribe: () => pubsub.asyncIterator([constants.subscriptions.TRAINEE_UPDATE]),
  },
  deleteTrainee: {
    subscribe: () => pubsub.asyncIterator([constants.subscriptions.TRAINEE_DELETE]),
  },
};
