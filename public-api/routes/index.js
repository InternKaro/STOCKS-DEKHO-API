const express = require('express');
const graphRouter = require('./graph');
const stocksRouter = require('./stocks');
const pricesRouter = require('./prices');
const newsRouter = require('./news');
const userRouter = require('./user');
const transactionRouter = require('./transaction');
const watchlistRouter = require('./watchlist');

const router = express.Router();
router.use('/graph', graphRouter);
router.use('/stocks',stocksRouter);
router.use('/prices',pricesRouter);
router.use('/news',newsRouter);
router.use('/user',userRouter);
router.use('/transaction',transactionRouter);
router.use('/watchlist',watchlistRouter);

module.exports = router;