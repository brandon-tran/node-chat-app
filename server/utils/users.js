
class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return this.users;
  }
  removeUser (id) {
    var removedUser;
    this.users = this.users.filter((user) => {
      if (user.id === id) {
        removedUser = user;
      }
      return user.id !== id;
    });
    return removedUser;
  }

  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  getUserList (room) {
    var users = this.users.filter((user) => {
      return user.room === room;
    })
    var namesArray = users.map((user) => {
      return user.name;
    })
    return namesArray;
  }
}

module.exports = {Users};


// addUser (i, name, room)
// remove user(sockketif)
// getUser(id)
// getUserlist(room)
