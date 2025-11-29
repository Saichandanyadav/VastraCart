const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const orderController = require('../controllers/orderController');

router.post('/checkout', protect, orderController.checkout);
router.get('/', protect, orderController.getOrdersForUser);

module.exports = router;
