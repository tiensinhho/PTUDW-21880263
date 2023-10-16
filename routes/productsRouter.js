'use strict'

let express = require('express');
let router = express.Router();
let controllers = require('../controllers/productsController');
let cartController = require('../controllers/cartController');

router.get('/', controllers.getData, controllers.show)
router.get('/cart', cartController.show)
router.get('/:id', controllers.getData, controllers.showDetails)
router.post('/cart', cartController.add);
router.put('/cart', cartController.update)
router.delete('/cart', cartController.remove)
router.delete('/cart/all', cartController.clear)

module.exports = router;