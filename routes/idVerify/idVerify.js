const express = require('express')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const users = require('../../models/userSchema')
const dataVerifyResult = require('../../public/javascripts/userDataVerify')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/chat',
    failureRedirect: '/verify/login',
    failureFlash: true
  })(req, res, next)
})

router.post('/register', (req, res) => {
  dataVerifyResult(req, res)
  const name = req.body.name
  const email = req.body.email
  let password = req.body.password
  const password2 = req.body.password2
  const errors = []
  users.findOne({email: email})
  .then(user => {
    if (user) {
      errors.push({ msg: 'The email is registered already' })
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2
      })
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err
          password = hash
          users.create({
            name,
            email,
            password
          })
          .then(users => {
            req.flash('msg', 'Your registration is successful')
            res.redirect('/verify/login')
          })
          .catch(err => console.log(err))
        })
      })
    }
  })
  .catch(err => console.log(err))
})
module.exports = router