## bigNano - **Generic CRUD API**


## Installation

```	
npm install bignano --save
```

## Usage
```	
const bignano = require('bignano');

const settings = {
	autoScale: true,
	port: process.env.PORT || 3000,

	mongoDB: {
		databaseName: "dbName",
		userName: "userName",
		password: "password",
		host: "ds121212.mlab.com",
		port: "1234",
	},
	middlewares: [],
	models: [
		{ name: "name", schema: require('./schema') }
	],
	routes: [{
		path: '/', model: "name", methods: ["GET", "PUT","POST", "DELETE"], autoGenerate: true
		},
	],

	fileStorage: {
		s3Token: ""  /* You need to be tocstack user to access fileStorage */
	}

};

global.server = new bignano(settings);

server.init();
const app = server.getAppInstance();

server.fileStorage('/home/sejal/Personal/node_js/sjljs/index.js', (response) => {
	console.log(response);
});


```
## Database Initialization
```
/* require('./schema')  
schema for models should be directly attached to models Object as shown in settingds Object
*/

var userSchema = module.exports = {
	title: String,
	name: String,
	firstName: String,
	lastName : String.
	country: String,
	date: {
		type: Date,
		default: Date.now()
	},
};

```

## Contributors

* Sejal Chougule (https://github.com/sjljrvis)