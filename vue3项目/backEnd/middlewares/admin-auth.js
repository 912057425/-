const jwt = require('jsonwebtoken')
const { Users } = require('../models')
const { NotFoundError, UnauthorizedError } = require('../utils/errors')
const { failure } = require('../utils/response')

module.exports = async (req, res, next) => {
  try {
    let { token } = req.headers
    if (!token) {
      throw new UnauthorizedError('当前接口需要认证才能访问')
    }
    // 验证token
    let decoded = jwt.verify(token, process.env.SECRET)
    let { id } = decoded
    if (id) {
      // 查询当前用户
      let person = await Users.findByPk(id)

      if (!person) {
        throw new NotFoundError('用户不存在')
      }
      // 验证当前用户是否是管理员
      if (person.role !== '管理员') {
        throw new UnauthorizedError('您没有权限使用当前接口。')
      }
      req.user = person
      next()
    }
  } catch (error) {
    failure(res, error)
  }
}
