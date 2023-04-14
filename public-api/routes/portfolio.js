const express = require('express');
const Portfolio = require('../services/portfolio');
const responseHandler = require('../../toolbox/helpers/response-handler');
const router = express.Router();
router.get('/:userId',(req,res)=>{
    const portfolioService = new Portfolio(req);
    return responseHandler(portfolioService.getHoldings(),res);
});
router.get('/sector/:userId',(req,res)=>{
    const portfolioService = new Portfolio(req);
    return responseHandler( portfolioService.getHoldingBySector(), res );
})
module.exports = router;