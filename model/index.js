const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, { foreignKey: 'author_id' });
Post.belongsTo(User, { foreignKey: 'author_id', onDelete: 'CASCADE' });

Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id', onDelete: 'CASCADE' });

User.hasMany(Comment, { foreignKey: 'author_id'});
Comment.belongsTo(User, { foreignKey: 'author_id', onDelete: 'CASCADE' });

module.exports = { User, Post, Comment };
