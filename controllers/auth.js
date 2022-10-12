const withAuth = (req, res, next) => {
    if(!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        next();
    }
};

const redirectLoggedIn = (req, res, next) => {
    if(req.session.loggedIn) {
        res.redirect('/');
    } else {
        next();
    }
};

module.exports = { withAuth, redirectLoggedIn };
