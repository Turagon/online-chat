const express = require('express')
const home = require('./home/home')
const chatRoom = require('./chat/chatRoom')
const idVerify = require('./idVerify/idVerify')

const router = express.Router()

router.use('/', home)
router.use('/chat', chatRoom)
router.use('/verify', idVerify)

module.exports = router