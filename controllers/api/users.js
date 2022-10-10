const { User, Post } = require('../../model');
const handleError = require('./handleError');
const { notFound } = require('./StatusError');

const router = require('express').Router();

const findUserById = (id) => User.findByPk(id, {
    include: [
        {
            model: Post,
            attributes: {
                exclude: ['content', 'author_id']
            }
        }
    ]
});

router.get('/:id', async function (req, res) {
    const { id } = req.params;
    try {
        const user = await findUserById(id);
        if(!user)
            notFound('user was not found!');
        res.status(200);
        res.json(user);
    } catch(err) {
        handleError(err, res);
    }
});

router.post('/', async function (req, res) {
    const body = req.body;
    try {
        const user = await User.create(body, {
            fields: ['username', 'password']
        });
        const returnData = {
            id: user.id,
            username: user.username,
            posts: []
        };
        res.status(201);
        res.json(returnData);
    } catch(err) {
        handleError(err, res);
    }
});

module.exports = router;
