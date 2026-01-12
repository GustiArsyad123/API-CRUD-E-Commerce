const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController');

router.post('/', controller.create);
router.get('/', controller.list);
router.get('/:id', controller.get);
router.patch('/:id/status', controller.updateStatus);

module.exports = router;
