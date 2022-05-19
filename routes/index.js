const router = require('express').Router();
const authRouter = require('./authRouter');
const buyerRouter = require('./buyerRouter');
const sellerRouter = require('./sellerRouter');
const authetication = require('../middlewares/auth')

router.use('/api/auth', authRouter);

router.use(authetication);
router.use('/api/buyer', buyerRouter);
router.use('/api/seller', sellerRouter);

module.exports = router