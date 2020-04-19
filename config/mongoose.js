
/* ----------------------------------
    connect to nfb dataBase mongoose
-------------------------------------*/


var mongoose = require('mongoose');

config = {
	mongoUrl: process.env.MONGO_URL
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



// mongoUrl: process.env.MONGO_URL
