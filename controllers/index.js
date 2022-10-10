const router = require('express').Router();
const pages = require('./pages');
const api = require('./api');

router.use('/', pages);
router.use('/api', api);

module.exports = router;
