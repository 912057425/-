const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Categories',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: { msg: '名称必须填写。' },
          notEmpty: { msg: '名称不能为空。' },
          len: { args: [2, 45], msg: '长度必须是2 ~ 45之间。' },
          async isUnique(value) {
            const Categories = sequelize.models.Categories
            const category = await Categories.findOne({
              where: { name: value }
            })
            if (category) {
              throw new Error('名称已存在，请选择其他名称。')
            }
          }
        }
      },
      rank: {
        type: DataTypes.INTEGER.UNSIGNED,
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
      },
      internal_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true, // 数据库层面的唯一约束
        validate: {
          notNull: { msg: '内部名称必须填写。' },
          notEmpty: { msg: '内部名称不能为空。' },
          len: { args: [2, 45], msg: '内部名称长度必须是2~45个字符。' },
          is: {
            args: /^[a-z0-9_]+$/i, // 仅允许字母、数字和下划线
            msg: '内部名称只能包含字母、数字和下划线。'
          },
          async isUnique(value) {
            const category = await sequelize.models.Categories.findOne({
              where: { internal_name: value }
            })
            if (category) {
              throw new Error('内部名称已存在，请选择其他名称。')
            }
          }
        }
      }
    },
    {
      sequelize,
      tableName: 'Categories',
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
}
