const express = require('express');
const graphRouter = require('./graph');
const router = express.Router();
router.use('/graph', graphRouter);
module.exports = router;