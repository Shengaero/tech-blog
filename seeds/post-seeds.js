const { Post } = require("../model");

const postData = [
    {
        title: 'Test Post 1',
        content: 'This is the first test post',
        author_id: 1
    },
    {
        title: 'Test Post 2',
        content: 'This is the second test post',
        author_id: 2
    },
    {
        title: 'Test Post 3',
        content: 'This is the third test post',
        author_id: 3
    },
];

module.exports = () => Post.bulkCreate(postData);
