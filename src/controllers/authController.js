var express = require('express');

var User = require('../models/user');

var router = express.Router();

router.post('/register', async (req, res) => {

    var { email } = req.body;

    try {

        if( await User.findOne( { email } )){
            return res.status(400).send( { error: 'User Already Exists' } );
        }

        var user = await User.create(req.body);

        user.password = undefined;

        return res.send( { user } );

    }

    catch (err) {

        return res.status(400).send( { error: 'Resgistration Failed' } );

    }

});


module.exports = app => app.use('/auth', router);