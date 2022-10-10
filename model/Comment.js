const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');
const Post = require('./Post');
const User = require('./User');

class Comment extends Model {}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Post, key: 'id' }
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: User, key: 'id' }
    }
}, {
    sequelize: sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'comment',
    tableName: 'comments_table'
});

module.exports = Comment;
