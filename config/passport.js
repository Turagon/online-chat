const strategy = require('passport-local')
const users = require('../models/userSchema')
const bcrypt = require('bcryptjs')

const localStrategy = new strategy({usernameField: 'email'}, (email, password, done) => {
  users.findOne({email: email})
  .then(user => {
    if (!user) {
      return done(null, false, {message: 'This email has not been registered'})
    } else {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err
        if (isMatch) {
          return done(null, user)
        } else {
          return done(null, false, {message: 'Password is incorrect'})
        }
      })
    }
  })
  .catch(error => {
    console.log(error)
  })
})

// pack middleware
function passportSet(passport) {
  passport.use(localStrategy)

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    users.findById(id, (err, user) => {
      done(err, user);
    });
  });
}

module.exports = passportSet