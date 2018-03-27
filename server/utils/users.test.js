const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    var users = new Users();
    users.users = [{
      id:'1',
      name: 'Mike',
      room: 'Node Course'
    },{
      id:'2',
      name: 'Julie',
      room: 'Node Course'
    },{
      id:'3',
      name: 'Jen',
      room: 'React Course'
    }];
    var response = users.addUser(user.id, user.name, user.room);
    
    expect(users.users).toEqual([user]);
  });


  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');

    expect(userList.toEqual(['Mike', 'Julie']));
  });
  it('should return names for react course', () => {
    var userList = users.getUserList('React Course');

    expect(userList.toEqual(['Jen']));
  });
});
