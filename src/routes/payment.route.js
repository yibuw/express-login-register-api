const express = require('express');
const passport = require('passport');
const PaymentController = require('../controllers/payment.controller');
const router = express.Router();

router.get(
  '/info',
  passport.authenticate('jwt', { session: false }),
  PaymentController.payment
);

module.exports = router;
