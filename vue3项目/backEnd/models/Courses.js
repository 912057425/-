const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  const Courses = sequelize.define(
    'Courses',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      categoryId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,

        unique: 'fk_Courses_Categories_2',
        validate: {
          notNull: { msg: '分类ID必须填写。' },
          notEmpty: { msg: '分类ID不能为空。' },
          async isPresent(value) {
            const category = await sequelize.models.Categories.findByPk(value)
            if (!category) {
              throw new Error(`ID为：${value} 的分类不存在。`)
            }
          }
        }
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: 'fk_Courses_Users_1',
        validate: {
          notNull: { msg: '用户ID必须填写。' },
          notEmpty: { msg: '用户ID不能为空。' },
          async isPresent(value) {
            const user = await sequelize.models.Users.findByPk(value)
            if (!user) {
              throw new Error(`ID为：${value} 的用户不存在。`)
            }
          }
        }
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: { msg: '名称必须填写。' },
          notEmpty: { msg: '名称不能为空。' },
          len: { args: [2, 45], msg: '名称长度必须是2 ~ 45之间。' }
        }
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      recommended: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0,
        validate: {
          isIn: {
            args: [[0, 1]],
            msg: '是否推荐的值必须是，推荐：1 不推荐：0。'
          }
        }
      },
      introductory: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0,
        validate: {
          isIn: {
            args: [[0, 1]],
            msg: '是否入门课程的值必须是，推荐：1 不推荐：0。'
          }
        }
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      likesCount: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      },
      chaptersCount: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      sequelize,
      tableName: 'Courses',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }]
        },
        {
          name: 'categoryId',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'categoryId' }]
        },
        {
          name: 'userId',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'userId' }]
        },
        {
          name: 'id',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }]
        }
      ]
    }
  )
  Courses.associate = function () {
    sequelize.models.Courses.belongsTo(sequelize.models.Categories, {
      as: 'category'
    })
    sequelize.models.Courses.belongsTo(sequelize.models.Users, {
      as: 'user'
    })
  }

  return Courses
}
