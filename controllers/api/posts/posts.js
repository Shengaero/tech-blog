const { Post, User } = require('../../../model');
const handleError = require('../handleError');
const { notFound } = require('../StatusError');

const router = require('express').Router();

const findPostById = (id) => Post.findByPk(id, {
    attributes: {
        exclude: ['author_id']
    },
    include: [{ model: User, as: 'author' }]
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await findPostById(id);
        if(!post)
            notFound('post was not found!');
        res.status(200);
        res.json(post);
    } catch(err) {
        handleError(err, res);
    }
});

router.post('/', async (req, res) => {
    // TODO figure out sessions
    res.sendStatus(501);
});

module.exports = router;
