// 章节接口-----
var express = require('express')
var router = express.Router()
const { Courses, Chapters } = require('../../models')
const { Op } = require('sequelize')

const { NotFoundError, success, failure } = require('../../utils/response')

/**
 * 公共方法：白名单过滤
 * @param req
 * @returns {{title, content: (string|string|DocumentFragment|*)}}
 */
function filterBody(req) {
  return {
    courseId: req.body.courseId,
    title: req.body.title,
    content: req.body.content,
    video: req.body.video,
    rank: req.body.rank
  }
}

/**
 * 公共方法：查询当前章节
 */
async function getChapter(req) {
  // 获取章节 ID
  const { id } = req.params
  let conditions = {
    include: [
      {
        model: Courses,
        as: 'course',
        attributes: ['id', 'name']
      }
    ]
  }
  // 查询当前章节
  const article = await Chapters.findByPk(id, conditions)

  // 如果没有找到，就抛出异常
  if (!article) {
    throw new NotFoundError(`ID: ${id}的章节未找到。`)
  }

  return article
}

/* 新增 */
router.post('/', async function (req, res, next) {
  try {
    let body = filterBody(req)
    let data = await Chapters.create(body)
    success(res, '新增章节成功', data)
  } catch (error) {
    failure(res, error)
  }
})
/* 删除 */
router.delete('/:id', async function (req, res, next) {
  try {
    let data = await getChapter(req)
    if (data) {
      await data.destroy()
      success(res, '删除章节成功')
    } else {
      failure(res, new NotFoundError(`章节未找到。`))
    }
  } catch (error) {
    failure(res, error)
  }
})
// 修改
router.put('/:id', async function (req, res, next) {
  try {
    let data = await getChapter(req)

    if (data) {
      let body = filterBody(req)
      await data.update(body)
      success(res, '修改章节成功')
    } else {
      failure(res, new NotFoundError(`章节未找到。`))
    }
  } catch (error) {
    failure(res, error)
  }
})
// 获取单个章节
router.get('/:id', async function (req, res, next) {
  try {
    let data = await getChapter(req)
    if (data) {
      success(res, '获取章节成功', data)
    } else {
      failure(res, new NotFoundError(`章节未找到。`))
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
          model: Courses,
          as: 'course',
          attributes: ['id', 'name']
        }
      ]
    }
    if (query.title) {
      conditions.where = {
        title: {
          [Op.like]: `%${query.title}%`
        }
      }
    }
    if (query.courseId) {
      conditions.where = {
        courseId: {
          [Op.eq]: query.courseId
        }
      }
    }

    let { rows: data, count } = await Chapters.findAndCountAll(conditions)

    if (data) {
      success(res, '获取章节成功', {
        data,
        pagination: {
          total: count,
          currentPage,
          pageSize
        }
      })
    } else {
      failure(res, new NotFoundError(`章节未找到。`))
    }
  } catch (error) {
    failure(res, error)
  }
})

module.exports = router
