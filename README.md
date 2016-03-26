# Towns backend


## Organization

https://trello.com/townsgame

https://trello.com/b/beAsHIkG/backend


## Authors of backend

**[SK] Stefan Kecskes:** https://www.skey.uk

**[PH] Pavol Hejný:** http://pavolhejny.com


## Folder Structure

    [towns5]/                   <- root adresár
	├── [bin]/
	|   └── www                     <- shell starter for node server
	├── [config]/                   <- central folder with all configurations
	|   ├── mongo.json              <- settings for mongoDb connection
	|   └── server.json             <- settings for api server
	├── [controllers]/              <- controllers for routes
	|   ├── [api]/                  <- json api controllers
	|   |   └── *.js                
	|   └── [http]/                 <- html controllers
	|       └── index.js            
	├── [layouts]/                  <- view templates for pages
	├── [migrations]/               <- schemas and seeds for mongoDB collections    
	|   └── 000x-*.js     
	├── [models]/                   <- collection models for mongoose
	|   ├── [schemas]/              <- Schemas are partials of collections 
	|   |   └── *.js                
	|   ├── [services]/             <- model helpers
	|   |   ├── db.js               <- connection to DB 
	|   |   └── validation.js       <- validations of models are here
	|   ├── *.js                    <- all models sits here
	├── [public]/                   <- publicly accessible folder for node server 
	|   └── [css]/
	|       └── style.css
	├── [routes]/                   <- routes
	|   └── *.js
	├── [test]/                     
	|   └── *.js                    <- tests for mocha.js
	├── .gitignore                  <- files ignored but git
	├── apiary.apib                 <- backup of API documentation from apiary 
	├── gulpgile.js                 <- configuration for linter testing
	├── Makefile                    
	├── package.json                <- npm packages
	└── server.js                   <- express starter


## Requirements

- Linux Server
- Node.js (with npm)
- mongoDB


## Installation

We will assume that you already have installed **globally node and npm**.

1. Go into api folder and install the necessary node modules (express framework, etc) with npm: `npm install`

2. Create directory or symlink with project towns-shared in root



## Launching

### Production environment

Towns 5 Api server is node.js aplication and can be launched on production environments with command:

	npm start

In case you use node manager like pm2, then go to root folder of project and run

	pm2 start ./bin/www
	
### Develop environment

In case you need to debug it or on develop environments set environment variable DEBUG=api:* This is set differently on
Mac, Linux or windows. We also use nodemonitor, which detects changes in files and restarts when requested.

For for debugging on Linux and Mac use this

	npm run start-debug
	
or for Windows use this
	
	set DEBUG=api:* & npm start


### Testing environment

On testing environment run:

    npm run start-test

Api will be accessible on http://localhost:3000

Tip: Consider using [pm2](https://www.npmjs.com/package/pm2) for running node server as service or managing multiple instances on one server

## Migrations

The code has also some default objects, which should be migrated into new mongoDB. This will show you the structure
of DB tables and adds you some objects to use with API.

Run changes in mongoDB schemas and seed new migrations (if necessary) by: 

    npm run mongo-migrate
    
DEVELOPERS ONLY: In case you want to drop all collections and create them again from migration collection use:
    
    npm run mongo-remigrate
    #if you want to remigrate testing mognoDB(mLab) use this instead
    npm run mongo-test-remigrate
	
## Testing

The api checks the environment variables and depending on them load correct DB and so on. Node starts automatically
in production mode, therefore we have to set it test environment. Start the server with correct NODE_ENV. 
    
    npm run start-test
    

### 1. Linter

You can run tests for javascript syntax errors with linter, just run

	gulp test


### 2. Mocha
 
Test files are in `test` directory. You can run [Mocha](https://mochajs.org) testing framework with BDD style
[should.js](https://github.com/shouldjs/should.js) assertion library. Basically any assertion which throws error
will work. Don't forget that node with API must be running to be able to test.

	# in test environment
	npm test
	## or on dev machine
	npm run mocha

