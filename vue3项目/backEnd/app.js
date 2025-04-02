var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

const adminAuth = require('./middlewares/admin-auth')
require('dotenv').config()

var indexRouter = require('./routes/index')
var articlesRouter = require('./routes/admin/articles')
var categoriesRouter = require('./routes/admin/categories')
var settingsRouter = require('./routes/admin/settings')
var usersRouter = require('./routes/admin/users')
var coursesRouter = require('./routes/admin/courses')
var chaptersRouter = require('./routes/admin/chapters')
var authRouter = require('./routes/admin/auth')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/admin/articles', adminAuth, articlesRouter)
app.use('/admin/categories', adminAuth, categoriesRouter)
app.use('/admin/settings', adminAuth, settingsRouter)
app.use('/admin/users', adminAuth, usersRouter)
app.use('/admin/courses', adminAuth, coursesRouter)
app.use('/admin/chapters', adminAuth, chaptersRouter)
app.use('/admin/auth', authRouter)

module.exports = app
