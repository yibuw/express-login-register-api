import express from 'express';
// import  passport from 'passport';
import { payment } from 'controllers/payment.controller';
import { verifyAccessToken } from 'middleware/verifyAccessToken';

const router = express.Router();

router.get(
    '/info',
    // session
    // passport.authenticate('jwt', { session: false }),
    verifyAccessToken,
    payment,
);

// module.exports = router;

export default router;
