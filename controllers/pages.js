const router = require('express').Router();
const { withAuth, redirectLoggedIn } = require('./auth');
const { Post, Comment, User } = require('../model');

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

router.get('/login', redirectLoggedIn, function (req, res) {
    res.render('login', {
        needScript: true,
        script: 'login',
        loggedIn: req.session.loggedIn
    });
});

router.get('/register', redirectLoggedIn, function (req, res) {
    res.render('register', {
        needScript: true,
        script: 'register',
        loggedIn: req.session.loggedIn
    });
});

router.get('/posts/:id', async function (req, res) {
    const { id } = req.params;
    try {
        const postData = await Post.findByPk(id, {
            attributes: {
                exclude: ['author_id']
            },
            include: [
                {
                    model: User,
                    as: 'author'
                },
                {
                    model: Comment,
                    as: 'comments',
                    include: [
                        {
                            model: User,
                            as: 'author'
                        }
                    ],
                    attributes: {
                        exclude: ['author_id', 'post_id']
                    }
                }
            ]
        });

        if(!postData) {
            res.redirect('/404');
            return;
        }

        const post = postData.get({ plain: true });
        post.date = new Date(post.date.toString()).toLocaleDateString();
        post.comments = post.comments.map(comment => {
            comment.date = new Date(comment.date.toString()).toLocaleDateString();
            return comment;
        });

        res.render('post', {
            post: post,
            needScript: true,
            script: 'post',
            loggedIn: req.session.loggedIn
        });
    } catch(err) {
        console.log(err);
        res.status(500);
        res.json(err);
    }
});

router.get('/dashboard', withAuth, async function (req, res) {
    try {
        const postData = await Post.findAll({
            where: { author_id: req.session.userId }
        });

        const posts = postData.map(post => {
            const plainPost = post.get({ plain: true });
            plainPost.date = new Date(plainPost.date.toString()).toLocaleDateString();
            return plainPost;
        });

        res.render('dashboard', {
            posts: posts,
            needScript: true,
            script: 'dashboard',
            loggedIn: req.session.loggedIn
        });
    } catch(err) {
        console.log(err);
        res.status(500);
        res.json(err);
    }
});

module.exports = router;
