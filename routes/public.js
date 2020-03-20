'use strict';

const
    express = require('express'),
    controllerPublic = require('../controllers/public'),
    controllerSalary = require('../controllers/salary');

let router = express.Router();

router.get('/', controllerSalary.index);
router.get('/about', controllerPublic.about);


module.exports = router;