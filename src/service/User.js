class User {
  constructor() {
    this.data = [];
  }

  createUser(name, email, role) {
    const { length } = this.data;
    const user = {
      id: length.toString(), name, email, role,
    };
    this.data.push(user);
    return user;
  }

  getUser(id) {
    return this.data.filter((value) => value.id === id)[0];
  }

  getUsers() {
    return this.data;
  }

  updateUser(id, name, role) {
    const idx = this.data.findIndex((value) => value.id === id);
    if (idx === -1) {
      throw new Error('No record found');
    }
    const oldUser = this.data[idx];
    const newUser = { ...oldUser, name, role };
    this.data[idx] = newUser;
    return newUser;
  }

  deleteUser(id) {
    const idx = this.data.findIndex((value) => value.id === id);
    this.data.splice(idx, 1);
    return id;
  }
}

export default new User();
