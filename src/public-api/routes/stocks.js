const express = require('express');
const responseHandler = require('../../toolbox/helpers/response-handler');
const router = express.Router();
const Stocks = require('../services/stocks');

router.put('/', async(req,res)=>{
    const stocksService = new Stocks(req);
    return responseHandler(stocksService.insertAllStocks(),res);
});

router.get('/all', async(req,res)=>{
    const stocksService = new Stocks(req);
    return responseHandler(stocksService.getAllStocksDetails(),res);
});

router.get('/:stockSymbol', async(req,res)=>{
    const stocksService = new Stocks(req);
    return responseHandler(stocksService.getStockDetails(),res);
});

router.delete('/inActiveStocks', async(req,res) =>{
    const stocksService = new Stocks(req);
    return responseHandler(stocksService.deleteInActiveStocks(),res);
});

module.exports = router;