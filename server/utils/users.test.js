const expect = require('expect');
const {Users} = require('./users');

beforeEach(() => {
  users = new Users();
  users.users = [{
    id: '1',
    name: 'Mike',
    room: 'Home'
  },{
    id: '2',
    name: 'John',
    room: 'Park'
  }, {
    id: '3',
    name: 'Lewis',
    room: 'Home'
  }];
});

describe('Users', () => {
  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: 12345,
      name: 'Brandon',
      room: 'Fly'
    };
    users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });
  it('should return names for Home room', () => {
    var userList = users.getUserList('Home');
    expect(userList).toEqual(['Mike', 'Lewis']);
  });
  it('should return names for Park room', () => {
    var userList = users.getUserList('Park');
    expect(userList).toEqual(['John']);
  });
  it('should remove a user', () => {
    var removedUser = users.removeUser('1');
    expect(removedUser.id).toBe('1');
    expect(users.users.length).toBe(2);

  });
  it('should not remove user', () => {
    var removeUser = users.removeUser('4');
    expect(removeUser).toNotExist();
    expect(users.users.length).toBe(3);

  });
  it('should find user', () => {
    var user = users.getUser('1');
    expect(user.id).toBe('1');
  });
  it('should not find user', () => {
    var user = users.getUser('4');
    expect(user).toNotExist();
  });
});
