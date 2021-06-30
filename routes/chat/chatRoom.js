const e = require('connect-flash')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('chatHome')
})

router.post('/', (req, res) => {
  const username = req.body.username
  const room = req.body.room || ''
  if (room && username) {
    res.redirect(`/chat/chatroom/?username=${username}&room=${room}`)
  } else if (!room) {
    req.flash('error', 'room name is mandidate')
    res.redirect('/chat')
  } else if (!username) {
    req.flash('error', 'username is necessary')
    res.redirect('/chat')
  }
})

router.get('/chatroom/?', (req, res) => {
  res.render('chatroom', {title: 'ChatRoom', layout: 'chatroomFrame'})
})

module.exports = router