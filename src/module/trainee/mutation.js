import user from '../../service/User';

export default {
  createTrainee: (parent, args) => {
    const { name, email, role } = args.user;
    return user.createUser(name, email, role);
  },
  updateTrainee: (parent, args) => {
    const { name, role } = args.user;
    return user.updateUser(args.id, name, role);
  },
  deleteTrainee: (parent, args) => user.deleteUser(args.id),
};
