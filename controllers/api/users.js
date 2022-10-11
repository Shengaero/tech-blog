const { User, Post } = require('../../model');
const handleError = require('./handleError');
const { notFound, badRequest } = require('./StatusError');

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

// create new user
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

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(201);
            res.json(returnData);
        });
    } catch(err) {
        handleError(err, res);
    }
});

router.post('/login', async function (req, res) {
    const { username, password } = req.body;
    try {
        if(!username)
            badRequest('username missing in request body!');
        if(!password)
            badRequest('password missing in request body!');

        const user = await User.findOne({
            where: { username: username },
            attributes: {
                include: ['password']
            }
        });

        if(!user || !(await user.checkPass(password)))
            badRequest(`incorrect username or password!`); // do not tell them if they got the username or password wrong

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200);
            res.json({ user: user, message: 'You are now logged in!' });
        });
    } catch(err) {
        handleError(err, res);
    }
});

router.post('/logout', async function (req, res) {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
