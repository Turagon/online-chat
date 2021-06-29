
const {username, room} = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io()

// send user info to server
socket.emit('joinRoom', { username, room });

// listen to message message
socket.on('message', (message) => {
  console.log(message.username)
  console.log(message.text)

  // auto scroll down 注意DOM要吻合
  chatMessages.scrollTop = chatMessages.scrollHeight
})

// listen to room and user update
socket.on('roomInfo', ({room, users}) => {
  console.log(room)
  console.log(users)
})

// send out message 注意msg的取得跟檢查 因為server端只用broadcast 所以client要create一個對話
socket.emit('chatMessage', msg)