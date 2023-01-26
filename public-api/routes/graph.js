const express = require('express');
const Graph = require('../services/graph');
const responseHandler = require('../../toolbox/helpers/response-handler');
const router = express.Router();

router.get('/:stockSymbol/:timeFrame', (req,res)=>{
    const graphService = new Graph({params:req.params,query:req.query});
    return responseHandler(graphService.priceHistory(),res)
});


module.exports = router;