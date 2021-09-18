const express = require('express');
const passport = require('passport');
const PaymentController = require('../controllers/payment.controller');
const router = express.Router();
const { verifyAccessToken } = require('../middleware/verifyAccessToken');

router.get(
  '/info',
  // session
  // passport.authenticate('jwt', { session: false }),
  verifyAccessToken,
  PaymentController.payment
);

module.exports = router;
