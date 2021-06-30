const users = []

function joinRoom (id, username, room) {
  const user = {id, username, room}
  users.push(user)
  return user
}

function formatMessage(username, text) {
  return {
    username,
    text,
    time: Date.now()
  };
}

function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

function getLeavingUser(id) {
  const index = users.findIndex(item => item.id === id)
  if (index !== -1) {
    return users.splice(index, 1)
  }
}


module.exports = { joinRoom, formatMessage, getRoomUsers, getCurrentUser, getLeavingUser }