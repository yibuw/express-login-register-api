"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import  passport from 'passport';
const payment_controller_1 = require("../controllers/payment.controller");
const verifyAccessToken_1 = require("../middleware/verifyAccessToken");
const router = express_1.default.Router();
router.get('/info', 
// session
// passport.authenticate('jwt', { session: false }),
verifyAccessToken_1.verifyAccessToken, payment_controller_1.payment);
// module.exports = router;
exports.default = router;
