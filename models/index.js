const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

User.hasMany(Post, {
  foreignKey: 'userId'
});

Post.belongsTo(User, {
  foreignKey: 'userId'
});

User.hasMany(Comment, {
  foreignKey: 'userId'
});

Comment.belongsTo(User, {
  foreignKey: 'userId'
});

Post.hasMany(Comment, {
  foreignKey: 'postId'
});

Comment.belongsTo(Post, {
  foreignKey: 'postId'
});

module.exports = {
  User,
  Comment,
  Post
};