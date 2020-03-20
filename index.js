'use strict';
const dotenv = require('dotenv')
dotenv.config()
var log = require('./config/logger') //init logger 

//const app = require('./server/app')
const config = require('./config/index');
log.debug(config.toString());

// ========= test code below
const express = require('express')
const app = express()

//var port = process.env.WWW_NODE_SALARY_SERVICE_PORT || 3000;
//var port = process.env.WWW_NODE_SALARY_SERVICE_PORT || 3000;

console.log(process.env);

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(config.server_port, () => console.log(`Example app listening on port ${config.server_port}!`))