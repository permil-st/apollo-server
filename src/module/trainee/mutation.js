import user from '../../service/User';
import pubsub from '../pubsub';
import constants from '../../lib';

export default {
  createTrainee: (parent, args) => {
    const { name, email, role } = args.user;
    const result = user.createUser(name, email, role);
    pubsub.publish(
      constants.subscriptions.TRAINEE_ADD,
      { addTrainee: result },
    );
    return result;
  },
  updateTrainee: (parent, args) => {
    const { name, role } = args.user;
    const result = user.updateUser(args.id, name, role);
    pubsub.publish(
      constants.subscriptions.TRAINEE_UPDATE,
      { updateTrainee: result },
    );
    return result;
  },
  deleteTrainee: (parent, args) => {
    const result = user.deleteUser(args.id);
    pubsub.publish(
      constants.subscriptions.TRAINEE_DELETE,
      { deleteTrainee: result },
    );
    return result;
  },
};
