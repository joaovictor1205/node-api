var jwt = require('jsonwebtoken');
var authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {

    var authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send( { error: 'No Token provided' } );
    }

    var parts = authHeader.split(' ');

    if (!parts.length === 2){
        return res.status(401).send( { error: 'Token error' } );
    }

    var [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send( { error: 'Token malformatted' } );
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {

        if(err){
            return res.status(401).send( { error: 'Token invalid' } );
        }

        req.userId = decoded.id;

        return next();

    });

};