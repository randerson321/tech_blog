const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/config');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
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
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Posts',
        key: 'id',
      }
    }
  },
  {
    sequelize,
    underscored: true,
    modelName: 'Comment'
  }
);

module.exports = Comment;