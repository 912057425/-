var DataTypes = require('sequelize').DataTypes
var _Chapters = require('./Chapters')

function initModels(sequelize) {
  var Chapters = _Chapters(sequelize, DataTypes)

  return {
    Chapters
  }
}
module.exports = initModels
module.exports.initModels = initModels
module.exports.default = initModels
