const router = require('express').Router();

router.get('/', (_, res) => {
    res.render('all');
});

module.exports = router;
