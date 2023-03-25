const express = require('express');
const responseHandler = require('../../toolbox/helpers/response-handler');
const router = express.Router();
const Stocks = require('../services/stocks');
const addHistoricalData = require("..//..//scripts//add-historical-data")
router.put('/', async(req,res)=>{
    const stocksService = new Stocks(req);
    return responseHandler(stocksService.insertAllStocks(),res);
});

router.get('/all', async(req,res)=>{
    const stocksService = new Stocks(req);
    return responseHandler(stocksService.getAllStocksDetails(),res);
});

router.get('/sectors', async(req,res) =>{
    const stocksService = new Stocks(req);
    return responseHandler(stocksService.getAllSectors(),res);
});

router.post('/postData' ,async(req ,res)=>{
  
    return responseHandler(addHistoricalData() , res)
} )

router.get('/getData' ,async(req ,res)=>{
    const stocksService = new Stocks(req);
    return responseHandler(stocksService.getHistoricalData() , res)
} )
router.get('/sectors/:sector', async(req,res) =>{
    const stocksService = new Stocks(req);
    return responseHandler(stocksService.getAllStocksBySector(),res);
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