const {Model, DataTypes, DATE} = require('sequelize');
const sequelize = require('../config/config');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      }
    }
  },
  {
    sequelize,
    underscored: true,
    modelName: 'Post',
  }
);

module.exports = Post;