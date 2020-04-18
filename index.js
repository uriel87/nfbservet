require('./config/mongoose')
var express = require('./config/express');

// Create a new Express application instance
var app = express();

// Use the Express application instance to listen to the port
console.log("process.env.Email", process.env.EMAIL)
console.log("process.env", process.env.EMAIL)

app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port + ' ..');
});
