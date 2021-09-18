const express = require('express');
const paymentApi = require('./payment.route');
const authApi = require('./auth.route');

const router = express.Router();

router.use('/payment', paymentApi);
router.use('/auth', authApi);

module.exports = router;
