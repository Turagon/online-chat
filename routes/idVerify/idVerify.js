const express = require('express')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const router = express.Router()

router.get('/login', (req, res) => {
  console.log('here is verification')
})

router.get('/register', (req, res) => {
  console.log('here is verification')
})

module.exports = router