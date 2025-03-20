const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  const Chapters = sequelize.define(
    'Chapters',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      courseId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
          notNull: { msg: '课程ID必须填写。' },
          notEmpty: { msg: '课程ID不能为空。' },
          async isPresent(value) {
            const course = await sequelize.models.Courses.findByPk(value)
            if (!course) {
              throw new Error(`ID为：${value} 的课程不存在。`)
            }
          }
        }
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: { msg: '标题必须填写。' },
          notEmpty: { msg: '标题不能为空。' }
        }
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      video: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      rank: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          notNull: { msg: '排序必须填写。' },
          notEmpty: { msg: '排序不能为空。' },
          isInt: { msg: '排序必须为整数。' },
          isPositive(value) {
            if (value <= 0) {
              throw new Error('排序必须是正整数。')
            }
          }
        }
      }
    },
    {
      sequelize,
      tableName: 'Chapters',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }]
        }
      ]
    }
  )
  Chapters.associate = function () {
    Chapters.belongsTo(sequelize.models.Courses, {
      as: 'course'
    })
  }
  return Chapters
}
