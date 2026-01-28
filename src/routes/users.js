const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', controller.create);
router.get('/', verifyToken, controller.list);
router.get('/:id', verifyToken, controller.get);
router.put('/:id', verifyToken, controller.update);
router.delete('/:id', verifyToken, controller.remove);

module.exports = router;
