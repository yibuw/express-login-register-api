import express from 'express';
const router = express.Router();
import paymentApi from './payment.route';
import authApi from './auth.route';

// const router = express.Router();

router.use('/payment', paymentApi);
router.use('/auth', authApi);

export default router;
