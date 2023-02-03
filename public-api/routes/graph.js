const express = require('express');
const Graph = require('../services/graph');
const responseHandler = require('../../toolbox/helpers/response-handler');
const router = express.Router();

router.get('/:stockSymbol', (req,res)=>{
    const graphService = new Graph(req);
    return responseHandler(graphService.priceHistory(),res)
});


module.exports = router;