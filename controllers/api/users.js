const { User } = require('../../model');
const { handleError, badRequest } = require('./handleError');
const router = require('express').Router();

// register new user
router.post('/', async function(req, res) {
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

// login user
router.post('/login', async function(req, res) {
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
            req.session.userId = user.id;

            res.status(200);
            res.json({ user: user, message: 'You are now logged in!' });
        });
    } catch(err) {
        handleError(err, res);
    }
});

// logout user
router.post('/logout', async function(req, res) {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
