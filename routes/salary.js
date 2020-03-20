'use strict';

const
    express = require('express'),
    controller = require('../controllers/salary');

let router = express.Router();
//let keycloak = require('../server.js').keycloak;

router.get('/', controller.index);

router.post('/search.json', controller.search);

router.get('/api/distinctJobTitles.json', controller.distinctJobTitles);

router.get('/api/distinctAgencyNames.json', controller.distinctAgencyNames);


module.exports = router; 