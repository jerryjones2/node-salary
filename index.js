'use strict';
const dotenv = require('dotenv')
dotenv.config()
var log = require('./config/logger') //init logger 

const app = require('./server/app')
const config = require('./config/index');
log.debug(config.toString());

app.create(config);
log.debug('app created')

app.start();
log.debug('app started')

// ========= test code below
// const express = require('express')
// const app = express()

// console.log(process.env);

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(config.server_port, () => console.log(`Example app listening on port ${config.server_port}!`))