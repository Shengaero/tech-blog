const { Post, Comment } = require('../../model');
const handleError = require('./handleError');

const router = require('express').Router();

// create new post
router.post('/', async (req, res) => {
    const body = req.body;
    console.log(body);
    try {
        const post = await Post.create({ ...body, author_id: req.session.userId });
        res.status(200);
        res.json(post);
    } catch(err) {
        handleError(err, res);
    }
});

router.post('/:id/comments', async (req, res) => {
    const body = req.body;
    const postId = req.params.id;
    try {
        const comment = await Comment.create({
            ...body,
            post_id: postId,
            author_id: req.session.userId
        });
        res.status(200);
        res.json(comment);
    } catch(err) {
        handleError(err);
    }
});

module.exports = router;
