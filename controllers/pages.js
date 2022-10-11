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

        const post = postData.get({ plain: true });
        post.date = new Date(post.date.toString()).toLocaleDateString();
        res.render('post', { post });
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;
