const express = require('express'),
    bodyParser = require('body-parser'),
    graphqlHttp = require('express-graphql'),
    graphQlSchema = require('../app/graphql/schema/index'),
    graphQlResolvers = require('../app/graphql/resolvers/index');
    isAuth = require('../app/middleware/is-auth');
    

module.exports = function() {

    var app = express();
    
    app.use(function(req, res, next) {
        console.log("req.method", req.method)
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        if(req.method == 'OPTIONS') {
            return res.sendStatus(200)
        }
        next();
    });


    app.set('Content-Type', 'text/plain');

    app.set("json spaces", 4);
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    app.use(isAuth);

	app.use('/graphql', bodyParser.json(),graphqlHttp({
		schema: graphQlSchema,
		rootValue: graphQlResolvers,
		graphiql: true
    }));
    
	return app;
};