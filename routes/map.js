'use strict';

const
    express = require('express'),
    controller = require('../controllers/map')
;

let router = express.Router();
//let keycloak = require('../server.js').keycloak;

router.get('/', controller.index);

router.get('/fullpage', controller.fullpage);

router.get('/stationList.json', controller.stationList);

router.get('/stationDetail.json', controller.stationDetail);

module.exports = router; 