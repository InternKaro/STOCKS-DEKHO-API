const express = require('express');
const graphRouter = require('./graph');
const stocksRouter = require('./stocks');
const pricesRouter = require('./prices');
const newsRouter = require('./news');

const router = express.Router();
router.use('/graph', graphRouter);
router.use('/stocks',stocksRouter);
router.use('/prices',pricesRouter);
router.use('/news',newsRouter);
module.exports = router;