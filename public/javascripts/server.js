const { joinRoom, formatMessage, getRoomUsers, getCurrentUser, getLeavingUser } = require('./usersAndMessages')
const chatMaster = 'T-Rex'

function socketConnection (io) {
  io.on('connection', socket => {
    // user 加入時的動作
    socket.on('joinRoom', ({ username, room }) => {
      const user = joinRoom(socket.id, username, room)
      socket.join(user.room)
      
      // welcome user
      socket.emit('message', formatMessage(chatMaster, `Welcome to room ${user.room}`))

      // broadcast to everyone in the same room
      socket.broadcast
      .to(user.room)
      .emit('message', formatMessage(chatMaster, `${user.username} has joined ${user.room}`))

      // update room and user info
      io.to(user.room).emit('roomInfo', {
        room: user.room,
        users: getRoomUsers(user.room)
      })
    })

    // user聊天時的動作
    socket.on('chatMessage', msg => {
      const curUser = getCurrentUser(socket.id)
      socket.broadcast
        .to(curUser.room)
        .emit('message', formatMessage(curUser.username, msg))
    })

    // user離線
    socket.on('disconnect', () => {
      const user = getLeavingUser(socket.id)
      if (user) {
        io.to(user[0].room)
        .emit('message', formatMessage(chatMaster, `${user[0].username} has left ${user[0].room}`))

        io.to(user[0].room)
        .emit('roomInfo', {
          room: user[0].room,
          users: getRoomUsers(user[0].room)
        })
      }
    })
  })
}

module.exports = socketConnection