const { User } = require("../model");

const userData = [
    {
        username: 'Test User 1',
        password: 'Test Password 1'
    },
    {
        username: 'Test User 2',
        password: 'Test Password 2'
    },
    {
        username: 'Test User 3',
        password: 'Test Password 3'
    }
];

module.exports = () => User.bulkCreate(userData);
