const request = require('request');
const mongoose = require('mongoose');
const express = require('express');


module.exports = function sjl() {

	this.settings = arguments[0]; /* First argument has to besettings object for project */
	this.db = null;
	this.routes = arguments[0].routes;

	this.app = express();

	this.initMiddlewares = () => {
		arguments[0].middlewares.forEach(element => {
			this.app.use(element);
		});
	}

	this.initSchema = () => {
		console.log(arguments[0].models);
		arguments[0].models.forEach(element => {
			let _schema = new mongoose.Schema(element.schema);
			this.db.model(element.name, element.schema)
		});
	}

	this.initDB = () => {
		this.db = mongoose.createConnection(`mongodb://${this.settings.mongoDB.userName}:${this.settings.mongoDB.password}@${this.settings.mongoDB.host}:${this.settings.mongoDB.port}/${this.settings.mongoDB.databaseName}`)
		this.db.once('open', () => {
			console.log("Connected to DB ->", this.settings.mongoDB.host);
		});
		this.db.on('error', console.error.bind(console, 'mongoose connection error: '));
	}


	this.initPort = () => {
		this.app.listen(arguments[0].port, () => {
			console.log("server listening to port ->", arguments[0].port);
		});
	}

	this.handleExpressRequest = () => {
		this.routes.forEach(element => {
			console.log(element)
			this.app[element.method.toLowerCase()](element.path, () => {
				this.db.models.CustomCronJob.find({}, (err, result) => {
					console.log(result)
				})
			});
		});
	};

	/* Connecting app to mongoDB and registering PORT */
	sjl.prototype.init = () => {
		this.initDB();
		this.initSchema();
		this.initPort(this.settings);
		this.initMiddlewares(this.settings);
		this.handleExpressRequest();
	};

	sjl.prototype.getSettings = () => {
		return this.settings;
	};

}
