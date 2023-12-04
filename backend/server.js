var app = require('./app');
var bodyParser = require('body-parser');
var mysql = require('mysql2');

app.listen(80, function() {
    console.log('Node app is running on port 80.')
});