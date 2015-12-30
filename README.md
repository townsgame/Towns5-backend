# Towns 5 API

* * *

## Struktura


	[towns5api]                 <- root adresár
    ├── app.js                  <- spúšťač - kontrollér
    ├── [bin]/
    │   └── www                 <- nastavnia pre node
    ├── package.json            <- npm balíkovač
    ├── [public]/               <- verejný adresár pre node server 
    │   ├── [images]/
    │   ├── [javascripts]/
    │   └── [stylesheets]/
    │       └── style.css
    ├── [routes]/               <- router
    │   ├── index.js           
    │   └── users.js
    └── [views]/                <- views
        ├── error.jade
        ├── index.jade
        └── layout.jade
	
* * *

## Requirements

- Linux Server
- Node.js (with npm)
- mongoDB

* * *

## Inštalácia

Predpokladám že node aj npm už máte nainštalované globálne.

1. Doinštalovať potrebné balíky (express framework, atď) cez npm balíkovač


	npm install
			

2. Migrovanie databazovych suborov

    node mongo-migrate -runmm
    
* * *

## Spustenie

Towns 5 Api server je node.js aplikácia a spúšťa sa jednoduchým príkazom:

	# na Linuxe a Macu takto
	DEBUG=api:* npm start
	# alebo na Windowse takto
	set DEBUG=myapp & npm start

Api bude bezat na http://localhost!3000

* * *
	
## Testovanie

//todo