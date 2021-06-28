const userSchema = require('../userSchema')
const db = require('../../config/mongoose')
const userData = require('../../users.json')

db.once('open', () => {
  userSchema.create(userData)
  .then(() => {
    console.log('user data imported')
  })
  .catch(err => {
    console.log(err)
  })
})
