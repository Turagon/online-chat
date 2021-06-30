const chatBox = document.querySelector('.chat-box')
const roomName = document.querySelector('.chatroom-name')
const roomUsers = document.querySelector('.chat-users')
const submitBTN = document.querySelector('.submit-btn')
const {username, room} = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io()

// send user info to server
socket.emit('joinRoom', { username, room });

// listen to message message
socket.on('message', (message) => {
  inbondMsg(message)
  chatBox.scrollTop = chatBox.scrollHeight
})

// listen to room and user update
socket.on('roomInfo', ({room, users}) => {
  roomName.innerHTML = `
  <div class="room-title">
    <div class="roomName">
      <i class="fas fa-broadcast-tower"></i>${room}
    </div>
    <div class="leaveButton>">
      <button class="leave-chat"><i class="fas fa-shoe-prints"></i>Leave</button>
    </div>
  </div>`
  displayUsers(users)

  // user離開 放這邊是避免async race
  const leaveBTN = document.querySelector('.leave-chat')
  leaveBTN.addEventListener('click', event => {
    const confirmLeave = confirm('Are you sure?');
    if (confirmLeave) {
      window.location = '/chat';
    }
  })
})

// send out message 注意msg的取得跟檢查 因為server端只用broadcast 所以client要create一個對話
submitBTN.addEventListener('click', event => {
  event.preventDefault()
  const msg = event.target.parentNode.firstElementChild.value
  if (!msg) {
    return
  } else {
    socket.emit('chatMessage', msg)
    outbondMsg(msg)
    chatBox.scrollTop = chatBox.scrollHeight
    event.target.parentNode.firstElementChild.value = ''
    event.target.parentNode.firstElementChild.focus()
  }
})

// 輔助函式
// 產生inbond的對話框
function inbondMsg(message) {
  const chatbox = document.querySelector('.chat-box')
  const chatSubBox = document.createElement('div')
  chatSubBox.classList.add('inbond-msg')
  const chatTitle = document.createElement('p')
  chatTitle.classList.add('chatTitle')
  const date = new Date(message.time + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ')
  chatTitle.innerHTML = `<span>${message.username} say :</span><span>${date}</span>`
  const chatContent = document.createElement('p')
  chatContent.classList.add('chatContent')
  chatContent.innerText = message.text
  chatSubBox.appendChild(chatTitle)
  chatSubBox.appendChild(chatContent)
  chatbox.appendChild(chatSubBox)
  chatSubBox.scrollTop = chatSubBox.scrollHeight
}

// 產生outbond的對話框
function outbondMsg(message) {
  const chatbox = document.querySelector('.chat-box')
  const chatSubBox = document.createElement('div')
  chatSubBox.classList.add('outbond-msg')
  const chatTitle = document.createElement('p')
  chatTitle.classList.add('outbond-chatTitle')
  const date = new Date(Date.now() + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ')
  chatTitle.innerHTML = `<span>${date}</span>`
  const chatContent = document.createElement('p')
  chatContent.classList.add('outbond-chatContent')
  chatContent.innerText = message
  chatSubBox.appendChild(chatTitle)
  chatSubBox.appendChild(chatContent)
  chatbox.appendChild(chatSubBox)
  chatSubBox.scrollTop = chatSubBox.scrollHeight
}

// 產生用戶列表
function displayUsers (users) {
  roomUsers.innerHTML = ''
  roomUsers.innerHTML = users.reduce((html, item) => {
    return html += `<p class="user-list">${item.username}</p>`
  }, '');
}