//分类接口-----

var express = require('express')
var router = express.Router()
const { Categories } = require('../../models')
const { Op } = require('sequelize')

const { NotFoundError, success, failure } = require('../../utils/response')

/**
 * 公共方法：白名单过滤
 */
function filterBody(req) {
  return {
    name: req.body.name,
    rank: req.body.rank
  }
}

/**
 * 公共方法：查询当前分类
 */
async function getCategorie(req) {
  // 获取分类 ID
  const { id } = req.params

  // 查询当前分类
  const article = await Categories.findByPk(id)

  // 如果没有找到，就抛出异常
  if (!article) {
    throw new NotFoundError(`ID: ${id}的分类未找到。`)
  }

  return article
}

/* 新增 */
router.post('/', async function (req, res, next) {
  try {
    let body = filterBody(req)
    let data = await Categories.create(body)
    success(res, '新增分类成功', data)
  } catch (error) {
    failure(res, error)
  }
})
/* 删除 */
router.delete('/:id', async function (req, res, next) {
  try {
    let data = await getCategorie(req)
    if (data) {
      await data.destroy()
      success(res, '删除分类成功')
    } else {
      failure(res, new NotFoundError(`分类未找到。`))
    }
  } catch (error) {
    failure(res, error)
  }
})
// 修改
router.put('/:id', async function (req, res, next) {
  try {
    let data = await getCategorie(req)

    if (data) {
      let body = filterBody(req)
      await data.update(body)
      success(res, '修改分类成功')
    } else {
      failure(res, new NotFoundError(`分类未找到。`))
    }
  } catch (error) {
    failure(res, error)
  }
})
// 获取单个分类
router.get('/:id', async function (req, res, next) {
  try {
    let data = await getCategorie(req)
    if (data) {
      success(res, '获取分类成功', data)
    } else {
      failure(res, new NotFoundError(`分类未找到。`))
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
    if (query.title) {
      conditions.where = {
        title: {
          [Op.like]: `%${query.title}%`
        }
      }
    }
    let { rows: data, count } = await Categories.findAndCountAll(conditions)

    if (data) {
      success(res, '获取分类成功', {
        data,
        pagination: {
          total: count,
          currentPage,
          pageSize
        }
      })
    } else {
      failure(res, new NotFoundError(`分类未找到。`))
    }
  } catch (error) {
    failure(res, error)
  }
})

module.exports = router
