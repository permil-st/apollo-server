import user from '../../service/User';

export default {
  getAllTrainees: () => user.getUsers(),
  getTrainee: (parent, args) => user.getUser(args.id),
};
