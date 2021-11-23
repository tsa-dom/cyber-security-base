const express = require('express')
const path = require('path')
require('./db')
const csrf = require('csurf')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const todoRouter = require('./routes/todos')
const userRouter = require('./routes/user')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(csrf({ cookie: true }))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(express.json())

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/todos', todoRouter)
app.use('/user', userRouter)

module.exports = app