const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const socket = require('socket.io')
const routes = require('./routes')
const socketConnection = require('./public/javascripts/server')
const PORT = process.env.PORT || 3000
require('./config/mongoose')
require('./config/passport')(passport)

const app = express()

app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))


// express-session
app.use(session({
  secret: 'thisisforchatroom',
  resave: true,
  saveUninitialized: true
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash())
app.use((req, res, next) => {
  res.locals.msg = req.flash('msg')
  res.locals.error = req.flash('error')
  next()
})

app.use(routes)
const server = app.listen(PORT, () => {
  console.log('server is on')
})

const io = socket(server)
socketConnection(io)