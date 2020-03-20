'use strict';

const
    express = require('express'),
    controller = require('../controllers/secured');

var keycloak = require('../server/app.js').keycloak;

let router = express.Router();

router.get('/', keycloak.protect(),controller.index);

router.get('/foil',keycloak.protect(),controller.foil);

module.exports = router;