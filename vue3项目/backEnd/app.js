require('dotenv').config()
const cors = require('cors')

var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

//后台接口
const adminAuth = require('./middlewares/admin-auth')

var articlesRouter = require('./routes/admin/articles')
var categoriesRouter = require('./routes/admin/categories')
var settingsRouter = require('./routes/admin/settings')
var usersRouter = require('./routes/admin/users')
var coursesRouter = require('./routes/admin/courses')
var chaptersRouter = require('./routes/admin/chapters')
var authRouter = require('./routes/admin/auth')

//前台接口
var index = require('./routes/index')

var app = express()

// CORS 跨域配置
app.use(cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//后台
app.use('/admin/articles', adminAuth, articlesRouter)
app.use('/admin/categories', adminAuth, categoriesRouter)
app.use('/admin/settings', adminAuth, settingsRouter)
app.use('/admin/users', adminAuth, usersRouter)
app.use('/admin/courses', adminAuth, coursesRouter)
app.use('/admin/chapters', adminAuth, chaptersRouter)
app.use('/admin/auth', authRouter)

//前台
app.use('/', index)

module.exports = app
