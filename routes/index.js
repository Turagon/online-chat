const express = require('express')
const home = require('./home/home')
const chatRoom = require('./chat/chatRoom')

const router = express.Router()

router.use('/', home)
router.use('/chat', chatRoom)

module.exports = router