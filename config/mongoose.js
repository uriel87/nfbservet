
/* ----------------------------------
    connect to cinerama dataBase mongoose
-------------------------------------*/


var mongoose = require('mongoose');
config = {
	mongoUrl:'mongodb://nfb:nfbnfb1@ds061797.mlab.com:61797/nfb'
};

//The server option auto_reconnect is defaulted to true
var options = {
	useNewUrlParser: true,
	useCreateIndex: true,
	auto_reconnect:true,
	useFindAndModify: false
};


mongoose.connect(config.mongoUrl, options);
db = mongoose.connection; // a global connection variable


// Event handlers for Mongoose

db.on('error', function (err) {
	console.log('Mongoose: Error: ' + err);
});


db.on('open', function() {
	console.log('Mongoose: Connection established');
});


db.on('disconnected', function() {
	console.log('Mongoose: Connection stopped, recconect');
	mongoose.connect(config.mongoUrl, options);
});


db.on('reconnected', function () {
	console.info('Mongoose reconnected!');
});


// require('../app/models/user');
// require('../app/models/task');
// require
