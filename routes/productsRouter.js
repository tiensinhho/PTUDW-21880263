'use strict'

let express = require('express');
let router = express.Router();
let controllers = require('../controllers/productsController');


router.get('/', controllers.getData, controllers.show)
router.get('/:id', controllers.getData, controllers.showDetails)

module.exports = router;