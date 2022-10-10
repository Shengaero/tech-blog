const { Comment } = require("../model");

const commentData = [
    {
        content: 'This is the first comment on the first post',
        post_id: 1,
        author_id: 2
    },
    {
        content: 'This is the second comment on the first post',
        post_id: 1,
        author_id: 3
    },
    {
        content: 'This is the first comment on the second post',
        post_id: 2,
        author_id: 1
    },
    {
        content: 'This is the second comment on the second post',
        post_id: 2,
        author_id: 3
    },
    {
        content: 'This is the first comment on the third post',
        post_id: 3,
        author_id: 1
    },
    {
        content: 'This is the second comment on the third post',
        post_id: 3,
        author_id: 2
    },
];

module.exports = () => Comment.bulkCreate(commentData);
