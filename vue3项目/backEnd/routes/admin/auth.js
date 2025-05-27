// 登录接口-----
var express = require('express')
var router = express.Router()
const { Users } = require('../../models')
const { Op } = require('sequelize')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { success, failure } = require('../../utils/response')
const { NotFoundError, BadRequestError } = require('../../utils/errors')

// 获取公钥
router.get('/public_key', function (req, res, next) {
  try {
    //从环境变量中获取公钥
    const publicKey = process.env.PUBLIC_KEY.replace(/\\n/g, '\n')
    success(res, '获取公钥成功', {
      publicKey
    })
  } catch (error) {
    failure(res, error)
  }
})

/* 登录 */
router.post('/sign_in', async function (req, res, next) {
  try {
    let { username, password } = req.body

    if (!username) {
      throw new BadRequestError('邮箱/用户名必须填写!')
    }
    if (!password) {
      throw new BadRequestError('密码必须填写!')
    }
    var NodeRSA = require('node-rsa')
    //从环境变量中获取私钥
    const _priKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
    const privateKey = new NodeRSA(_priKey)
    privateKey.setOptions({ encryptionScheme: 'pkcs1' })

    var dePassword = privateKey.decrypt(password, 'utf8')

    let condition = {
      where: {
        [Op.or]: [{ username: username }, { email: username }]
      }
    }
    let data = await Users.findOne(condition)
    if (!data) {
      throw new NotFoundError('用户不存在，请先注册!')
    } else {
      let isMatch = await bcrypt.compare(dePassword, data.password)
      if (!isMatch) {
        throw new BadRequestError('密码错误!')
      }
      //是否是管理员，是管理员才能登录
      if (data.role !== '管理员') {
        throw new BadRequestError('您不是管理员，无法登录')
      }
      //生成token
      const secretKey = process.env.SECRET
      let token = jwt.sign(
        {
          id: data.id
        },
        secretKey,
        {
          expiresIn: '30d'
        }
      )
      success(res, '登录成功', {
        token,
        userInfo: {
          id: data.id,
          username: data.username,
          nickname: data.nickname,
          email: data.email,
          role: data.role
        }
      })
    }
  } catch (error) {
    failure(res, error)
  }
})

module.exports = router
