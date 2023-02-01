const express = require('express');
const populateStockDetails = require('../../scripts/populate-stock-details');
const {AllStocksModel} = require('../models');
const router = express.Router();

router.put('/', async(req,res)=>{
    const stockDetails = await AllStocksModel.find({});
    if(stockDetails){
        await AllStocksModel.deleteMany({});
    }
    await populateStockDetails();
    res.json({result:'OK'});
});

router.get('/all', async(req,res)=>{
    const {limit = 10,skip = 0} = req.query;
    const allStocks = await AllStocksModel.find({}).limit(limit).skip(skip);
    res.json({data: allStocks});
});

router.get('/:stockSymbol', async(req,res)=>{
    const stockDetails = await AllStocksModel.findOne({symbol: req.params.stockSymbol});
    res.json({stockDetails});
});

module.exports = router;