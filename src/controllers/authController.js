var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var authConfig = require('../config/auth');

var User = require('../models/user');

var router = express.Router();

function generateToken(params = { } ){
    return jwt.sign( params , authConfig.secret , {
        expiresIn: 86400,
    } );
}


router.post('/register', async (req, res) => {

    var { email } = req.body;

    try {

        if( await User.findOne( { email } )){
            return res.status(400).send( { error: 'User Already Exists' } );
        }

        var user = await User.create(req.body);

        user.password = undefined;

        return res.send( { 
            user,
            token: generateToken( { id: user.id } ),
        });

    }

    catch (err) {

        return res.status(400).send( { error: 'Resgistration Failed' } );

    }

});

router.post('/authenticate', async (req, res) => {

    var { email, password } = req.body;

    var user = await User.findOne( { email } ).select('+password');

    if (!user){
        return res.status(400).send( { error: 'User not found' } );
    }

    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send( { error: 'Invalid password' } );
    }

    user.password = undefined;


    res.send( { 
        user, 
        token: generateToken( { id: user.id } )
    });

});


module.exports = app => app.use('/auth', router);