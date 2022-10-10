const router = require('express').Router();
const posts = require('./posts');
const comments = require('./comments');

router.use('/', posts);
router.use('/', comments);

module.exports = router;
