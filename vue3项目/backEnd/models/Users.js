const Sequelize = require('sequelize')
const bcrypt = require('bcryptjs')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Users',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: 'emai',
        validate: {
          notNull: { msg: '邮箱必须填写。' },
          notEmpty: { msg: '邮箱不能为空。' },
          isEmail: { msg: '邮箱格式不正确。' },
          async isUnique(value) {
            const Users = sequelize.models.Users
            const category = await Users.findOne({
              where: { email: value }
            })
            if (category) {
              throw new Error('邮箱已存在，请选择其他邮箱。')
            }
          }
        }
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: 'username',
        validate: {
          notNull: { msg: '用户名必须填写。' },
          notEmpty: { msg: '用户名不能为空。' },
          len: { args: [2, 45], msg: '用户名长度必须是2 ~ 45之间。' },
          async isUnique(value) {
            const Users = sequelize.models.Users
            const category = await Users.findOne({
              where: { username: value }
            })
            if (category) {
              throw new Error('用户名已存在，请选择其他用户名。')
            }
          }
        }
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        set(value) {
          // 检查是否为空
          if (!value) {
            throw new Error('密码必须填写。')
          }

          // 检查长度
          if (value.length < 6 || value.length > 45) {
            throw new Error('密码长度必须是6 ~ 45之间。')
          }

          // 如果通过所有验证，进行hash处理并设置值
          this.setDataValue('password', bcrypt.hashSync(value, 10))
        }
      },
      nickname: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      sex: {
        type: DataTypes.ENUM('男', '女'),
        allowNull: false,
        validate: {
          notNull: { msg: '性别必须填写。' },
          notEmpty: { msg: '性别不能为空。' }
        }
      },
      avatar: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      company: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      introduce: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      role: {
        type: DataTypes.ENUM('管理员', '普通用户'),
        allowNull: false,
        defaultValue: '普通用户',
        validate: {
          notNull: { msg: '用户组必须选择。' },
          notEmpty: { msg: '用户组不能为空。' }
        }
      }
    },
    {
      sequelize,
      tableName: 'Users',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }]
        },
        {
          name: 'emai',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'email' }]
        },
        {
          name: 'username',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'username' }]
        },
        {
          name: 'id',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }]
        },
        {
          name: 'role',
          using: 'BTREE',
          fields: [{ name: 'role' }]
        }
      ]
    }
  )
}
