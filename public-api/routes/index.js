const express = require('express');
const graphRouter = require('./graph');
const stocksRouter = require('./stocks');
const router = express.Router();
router.use('/graph', graphRouter);
router.use('/stocks',stocksRouter);
module.exports = router;