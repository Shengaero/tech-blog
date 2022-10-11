const { Post, Comment, User } = require('../model');

const router = require('express').Router();

router.get('/', async function (req, res) {
    try {
        const postData = await Post.findAll({
            include: [{ model: User, as: 'author' }]
        });

        const posts = postData.map(post => {
            const plainPost = post.get({ plain: true });
            plainPost.date = new Date(plainPost.date.toString()).toLocaleDateString();
            return plainPost;
        });

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch(err) {
        console.log(err);
        res.status(500);
        res.json(err);
    }
});

router.get('/login', async function (req, res) {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login', {
        needScript: true,
        script: 'login'
    });
});

router.get('/register', async function (req, res) {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('register', {
        needScript: true,
        script: 'register'
    });
});

router.get('/posts/:id', async function (req, res) {
    const { id } = req.params;
    try {
        const post = Post.findByPk(id, {
            include: [Comment]
        });
    } catch(err) {
        console.err(err);
    }
});

module.exports = router;
