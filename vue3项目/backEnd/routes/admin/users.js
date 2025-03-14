// 用户接口-----
var express = require('express')
var router = express.Router()
const { Users } = require('../../models')
const { Op } = require('sequelize')

const { NotFoundError, success, failure } = require('../../utils/response')

/**
 * 公共方法：白名单过滤
 */
function filterBody(req) {
  return {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    nickname: req.body.nickname,
    sex: req.body.sex,
    company: req.body.company,
    introduce: req.body.introduce,
    role: req.body.role,
    avatar: req.body.avatar
  }
}

/**
 * 公共方法：查询当前用户
 */
async function getUser(req) {
  // 获取用户 ID
  const { id } = req.params

  // 查询当前用户
  const article = await Users.findByPk(id)

  // 如果没有找到，就抛出异常
  if (!article) {
    throw new NotFoundError(`ID: ${id}的用户未找到。`)
  }

  return article
}

/* 新增 */
router.post('/', async function (req, res, next) {
  try {
    let body = filterBody(req)
    let data = await Users.create(body)
    success(res, '新增用户成功', data)
  } catch (error) {
    failure(res, error)
  }
})
// /* 删除 */
// router.delete('/:id', async function (req, res, next) {
//   try {
//     let data = await getUser(req)
//     if (data) {
//       await data.destroy()
//       success(res, '删除用户成功')
//     } else {
//       failure(res, new NotFoundError(`用户未找到。`))
//     }
//   } catch (error) {
//     failure(res, error)
//   }
// })
// 修改
router.put('/:id', async function (req, res, next) {
  try {
    let data = await getUser(req)

    if (data) {
      let body = filterBody(req)
      await data.update(body)
      success(res, '修改用户成功')
    } else {
      failure(res, new NotFoundError(`用户未找到。`))
    }
  } catch (error) {
    failure(res, error)
  }
})
// 获取单个用户
router.get('/:id', async function (req, res, next) {
  try {
    let data = await getUser(req)
    if (data) {
      success(res, '获取用户成功', data)
    } else {
      failure(res, new NotFoundError(`用户未找到。`))
    }
  } catch (error) {
    failure(res, error)
  }
})
//查询
router.get('/', async function (req, res, next) {
  //如果没有模糊查询，就查找全部
  try {
    const query = req.query

    // 当前是第几页，如果不传，那就是第一页
    const currentPage = Math.abs(Number(query.currentPage)) || 1

    // 每页显示多少条数据，如果不传，那就显示10条
    const pageSize = Math.abs(Number(query.pageSize)) || 10

    // 计算offset
    const offset = (currentPage - 1) * pageSize

    let conditions = {
      limit: pageSize,
      offset
    }
    if (query.email) {
      conditions.where = {
        email: {
          [Op.eq]: query.email
        }
      }
    }

    if (query.username) {
      conditions.where = {
        username: {
          [Op.eq]: query.username
        }
      }
    }

    if (query.nickname) {
      conditions.where = {
        nickname: {
          [Op.like]: `%${query.nickname}%`
        }
      }
    }

    if (query.role) {
      conditions.where = {
        role: {
          [Op.eq]: query.role
        }
      }
    }

    let { rows: data, count } = await Users.findAndCountAll(conditions)

    if (data) {
      success(res, '获取用户成功', {
        data,
        pagination: {
          total: count,
          currentPage,
          pageSize
        }
      })
    } else {
      failure(res, new NotFoundError(`用户未找到。`))
    }
  } catch (error) {
    failure(res, error)
  }
})

module.exports = router
