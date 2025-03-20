// 课程接口-----
var express = require('express')
var router = express.Router()
const { Courses, Categories, Users } = require('../../models')
const { Op } = require('sequelize')

const { NotFoundError, success, failure } = require('../../utils/response')

/**
 * 公共方法：白名单过滤
 * @param req
 * @returns {{title, content: (string|string|DocumentFragment|*)}}
 */
function filterBody(req) {
  return {
    categoryId: req.body.categoryId,
    userId: req.body.userId,
    name: req.body.name,
    image: req.body.image,
    recommended: req.body.recommended,
    introductory: req.body.introductory,
    content: req.body.content
  }
}

/**
 * 公共方法：查询当前课程
 */
async function getCourse(req) {
  // 获取课程 ID
  const { id } = req.params
  let conditions = {
    include: [
      {
        model: Categories,
        as: 'category',
        attributes: ['id', 'name']
      },
      {
        model: Users,
        as: 'user',
        attributes: ['id', 'username']
      }
    ],
    attributes: {
      exclude: ['CategoryId', 'UserId']
    }
  }
  // 查询当前课程
  const article = await Courses.findByPk(id, conditions)

  // 如果没有找到，就抛出异常
  if (!article) {
    throw new NotFoundError(`ID: ${id}的课程未找到。`)
  }

  return article
}

/* 新增 */
router.post('/', async function (req, res, next) {
  try {
    let body = filterBody(req)
    let data = await Courses.create(body)
    success(res, '新增课程成功', data)
  } catch (error) {
    failure(res, error)
  }
})
/* 删除 */
router.delete('/:id', async function (req, res, next) {
  try {
    let data = await getCourse(req)
    if (data) {
      await data.destroy()
      success(res, '删除课程成功')
    } else {
      failure(res, new NotFoundError(`课程未找到。`))
    }
  } catch (error) {
    failure(res, error)
  }
})
// 修改
router.put('/:id', async function (req, res, next) {
  try {
    let data = await getCourse(req)

    if (data) {
      let body = filterBody(req)
      await data.update(body)
      success(res, '修改课程成功')
    } else {
      failure(res, new NotFoundError(`课程未找到。`))
    }
  } catch (error) {
    failure(res, error)
  }
})
// 获取单个课程
router.get('/:id', async function (req, res, next) {
  try {
    let data = await getCourse(req)
    if (data) {
      success(res, '获取课程成功', data)
    } else {
      failure(res, new NotFoundError(`课程未找到。`))
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
      offset,
      include: [
        {
          model: Categories,
          as: 'category',
          attributes: ['id', 'name']
        },
        {
          model: Users,
          as: 'user',
          attributes: ['id', 'username']
        }
      ],
      attributes: {
        exclude: ['CategoryId', 'UserId']
      }
    }
    if (query.name) {
      conditions.where = {
        name: {
          [Op.like]: `%${query.name}%`
        }
      }
    }
    if (query.categoryId) {
      conditions.where = {
        categoryId: {
          [Op.eq]: query.categoryId
        }
      }
    }
    if (query.userId) {
      conditions.where = {
        userId: {
          [Op.eq]: query.userId
        }
      }
    }
    let { rows: data, count } = await Courses.findAndCountAll(conditions)

    if (data) {
      success(res, '获取课程成功', {
        data,
        pagination: {
          total: count,
          currentPage,
          pageSize
        }
      })
    } else {
      failure(res, new NotFoundError(`课程未找到。`))
    }
  } catch (error) {
    failure(res, error)
  }
})

module.exports = router
