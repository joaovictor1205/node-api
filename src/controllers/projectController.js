var express = require('express');
var authMiddleware = require('../middleware/auth');

var router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {

    res.send( { ok: true, user: req.userId } );

});

module.exports = app => app.use('/projects', router);
