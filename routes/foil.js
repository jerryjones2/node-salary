'use strict';

const
    express = require('express'),
    controller = require('../controllers/foil');

let router = express.Router();
//let keycloak = require('../server.js').keycloak;

router.get('/', controller.index);


module.exports = router;