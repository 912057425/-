// 系统设置接口-----
var express = require('express')
var router = express.Router()
const { Settings } = require('../../models')

const { NotFoundError, success, failure } = require('../../utils/response')

/**
 * 公共方法：白名单过滤
 */
function filterBody(req) {
  return {
    name: req.body.name,
    icp: req.body.icp,
    copyright: req.body.copyright
  }
}

/**
 * 公共方法：查询设置
 */
async function getSetting() {
  // 查询
  const article = await Settings.findOne()
  console.log('article', article)
  // 如果没有找到，就抛出异常
  if (!article) {
    throw new NotFoundError(`ID: 设置未找到。`)
  }
  return article
}

// 修改
router.put('/', async function (req, res, next) {
  try {
    let data = await getSetting(req)
    let body = filterBody(req)

    await data.update(body)
    success(res, '更新系统设置成功')
  } catch (error) {
    failure(res, error)
  }
})
// 获取
router.get('/', async function (req, res, next) {
  try {
    let data = await getSetting(req)

    success(res, '获取系统设置成功', data)
  } catch (error) {
    failure(res, error)
  }
})

module.exports = router
