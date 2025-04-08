const express = require('express')
const router = express.Router()
const { Courses, Categories, Users, Chapters } = require('../models')
const { success, failure } = require('../utils/response')
const { Op } = require('sequelize')

/**
 * 查询首页数据
 * GET /
 */
router.get('/', async function (req, res, next) {
  try {
    // 获取推荐课程
    const recommendCourses = await Courses.findAll({
      where: {
        recommended: 1
      },
      include: [
        {
          model: Users,
          as: 'user',
          attributes: ['id', 'username', 'avatar']
        },
        {
          model: Categories,
          as: 'category',
          attributes: ['id', 'name']
        }
      ]
    })

    //获取人气课程,点赞要大于100
    const likesCourses = await Courses.findAll({
      where: {
        likesCount: {
          [Op.gt]: 100
        }
      },
      include: [
        {
          model: Categories,
          as: 'category',
          attributes: ['id', 'name']
        }
      ],
      order: [['likesCount', 'desc']],
      limit: 10
    })

    //获取入门课程
    const introductoryCourses = await Courses.findAll({
      where: {
        introductory: 1
      },
      include: [
        {
          model: Categories,
          as: 'category',
          attributes: ['id', 'name']
        }
      ],
      limit: 10
    })

    success(res, '获取推荐课程成功', {
      recommendCourses,
      likesCourses,
      introductoryCourses
    })
  } catch (error) {
    failure(res, error)
  }
})

module.exports = router
