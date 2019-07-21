var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/node-api', { useNewUrlParser: true, useCreateIndex: true } );

mongoose.Promise = global.Promise;

module.exports = mongoose;