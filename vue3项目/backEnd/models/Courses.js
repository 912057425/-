const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
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
        references: {
          model: 'Categories',
          key: 'id'
        },
        unique: 'fk_Courses_Categories_2'
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        unique: 'fk_Courses_Users_1'
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      recommended: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0,
        unique: 'recommended'
      },
      introductory: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0,
        unique: 'introductory'
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
        },
        {
          name: 'recommended',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'recommended' }]
        },
        {
          name: 'introductory',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'introductory' }]
        }
      ]
    }
  )
}
