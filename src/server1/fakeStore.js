const users = [{
  id: 1,
  name: 'Pete',
  location: 'UK',
  registered: new Date('2019-07-11')
}, {
  id: 2,
  name: 'Bill',
  location: 'UK',
  registered: new Date('2019-05-27')
}, {
  id: 3,
  name: 'Lucy',
  location: 'USA',
  registered: new Date('2018-12-21')
}];

const userFriends = [{
  userId: 1,
  userFriendIds: [2, 3]
}, {
  userId: 2,
  userFriendIds: [1]
}, {
  userId: 3,
  userFriendIds: [1]
}];

module.exports = { users, userFriends };
