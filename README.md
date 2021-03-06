# `This project is very old and not maintained for a long time. So expect a very pure code quality, outdated dependencies and security issues.`

# π Towns5 backend


## Organization

https://trello.com/townsgame

https://trello.com/b/beAsHIkG/backend


## Authors of backend

**[SK] Stefan Kecskes:** https://www.skey.uk

**[PH] Pavol HejnΓ½:** http://pavolhejny.com


## Folder Structure

    [towns5]/                       <- root folder
	βββ [bin]/                      <- all shell scripts for app
	|   βββ www                     <- shell starter for node server
	βββ [config]/                   <- central folder with all configurations
	|   βββ db.js                   <- settings for mongoDb connection
	|   βββ server.js               <- settings for api server
	βββ [controllers]/              <- controllers for routes
	|   βββ [api]/                  <- json api controllers
	|   |   βββ *.js       
	|   βββ [http]/                 <- html controllers
	|   |   βββ index.js     	         
	|   βββ [middleware]/           <- middlewares
	|       βββ *.js            
	βββ [database]/                 <- data related classes
	|   βββ [backup]/               <- DB backups and backup script
	|   βββ [migrations]/           <- schemas and seeds for mongoDB collections    
    |	|   βββ 00xy-*.js     
	|   βββ [models]/               <- collection models for mongoose
	|   |   βββ *.js                <- all models sits here
	|   βββ [schemas]/              <- Schemas are partials of collections 
	|   |   βββ *.js                
	|   βββ [seeds]/                
	|   |   βββ *.js                <- seeded data
	|   βββ [services]/             <- model helpers
	|       βββ mongoose.js         <- mongoose wrapper around DB 
	|       βββ validation.js       <- validations of models are here
	βββ [layouts]/                  <- view templates for pages
	βββ [public]/                   <- publicly accessible folder for node server 
	|   βββ [css]/
	|       βββ style.css
	βββ [routes]/                   <- routes
	|   βββ *.js
	βββ [test]/                     
	|   βββ *.js                    <- tests for mocha.js
	βββ .env                        <- environment variables (copy from .env.example and fill in details)
	βββ .gitignore                  <- files ignored but git
	βββ apiary.apib                 <- backup of API documentation from apiary 
	βββ gulpgile.js                 <- configuration for linter testing
	βββ Makefile                    
	βββ package.json                <- npm packages
	βββ server.js                   <- express starter


## Requirements

- Linux Server
- Node.js (with npm)
- mongoDB


## Installation

We will assume that you already have installed **globally node and npm**.

1. Go into api folder and install the necessary node modules (express framework, etc) with npm: `npm install`

2. copy .env.example to .env file and fill in the required details


## Launching

### Production and testing environment

Towns 5 Api server is node.js application and can be launched with command:

	npm start

In case you use node manager like pm2, then go to root folder of project and run

	pm2 start ./bin/www
	
### Develop environment

In case you need to debug it or on develop environments set environment variable DEBUG=api:* This is set differently on
Mac, Linux or windows. We also use nodemonitor, which detects changes in files and automatically restarts node.

For for debugging on Linux and Mac use this

	npm run start-debug
	
or for Windows use this
	
	set DEBUG=api:* & npm start

Api will be accessible on http://localhost:3000

Tip: Consider using [pm2](https://www.npmjs.com/package/pm2) for running node server as service or managing multiple instances on one server

## Migrations

The code has some default objects and schemes, which should be migrated into applications mongoDB.

Run new changes in mongoDB schemas and seed new migrations (if necessary) by running: 

    npm run mongo-migrate
    
You can easily backup current DB (using current the .env). It will be saved in folder like this: `/database/backup/db-20160412-1649.tar` by running:
 
    npm run mongo-backup
    
DEVELOPERS ONLY: In case you want to drop all collections and create them again from migration collection use:
    
    npm run mongo-remigrate
	
## Testing

Node loads automatically environment variables from .env file, therefore it have to be set to test environment. 
    
    npm run start
    
### with Linter

You can run tests for javascript syntax errors with linter, just run

	gulp test


### with Mocha
 
Test files are in `test` directory. You can run [Mocha](https://mochajs.org) testing framework with BDD style
[should.js](https://github.com/shouldjs/should.js) assertion library. Basically any assertion which throws error
will work. Don't forget that node with API must be running to be able to test.

	npm test

