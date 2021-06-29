const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('chatHome')
})

router.post('/', (req, res) => {
  const username = req.body.username
  const room = req.body.room
  res.redirect(`/chat/chatroom/?username=${username}&room=${room}`)
})

router.get('/chatroom/?', (req, res) => {
  res.render('chatroom', {title: 'ChatRoom', layout: 'chatroomFrame'})
})

module.exports = router