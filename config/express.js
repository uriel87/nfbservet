const express = require('express'),
	bodyParser = require('body-parser'),
    graphqlHttp = require('express-graphql'),
    graphQlSchema = require('../app/graphql/schema/index'),
    graphQlResolvers = require('../app/graphql/resolvers/index');
	// isAuth = require('../app/middleWre/is-auth');



module.exports = function() {

	var app = express();

	const users = [];

    app.use(function(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        if(req.method === 'OPTIONS') {
            return res.sendStatus(200)
        }
        next();
    });

    app.set('Content-Type', 'text/plain');
    app.set("json spaces", 4);
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

	//app.use(isAuth);

	app.use('/graphql', bodyParser.json(),graphqlHttp({
		schema: graphQlSchema,
		rootValue: graphQlResolvers,
		graphiql: true
	}));


	return app;

};