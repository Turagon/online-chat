const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('chatHome')
})

router.post('/', (req, res) => {
  res.render('chatroom', { title: 'Chat Room', layout: 'chatroomFrame' })
})

module.exports = router