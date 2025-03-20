var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var articlesRouter = require('./routes/admin/articles')
var categoriesRouter = require('./routes/admin/categories')
var settingsRouter = require('./routes/admin/settings')
var usersRouter = require('./routes/admin/users')
var coursesRouter = require('./routes/admin/courses')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/admin/articles', articlesRouter)
app.use('/admin/categories', categoriesRouter)
app.use('/admin/settings', settingsRouter)
app.use('/admin/users', usersRouter)
app.use('/admin/courses', coursesRouter)

module.exports = app
