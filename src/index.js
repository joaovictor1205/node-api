var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false } ));

require('./controllers/authController')(app);
require('./controllers/projectController')(app);


app.listen(3000);
console.log('Servidor ON');