const express = require('express');
const populateStockDetails = require('../../scripts/populate-stock-details');
const {allStocksModel} = require('../models');
const router = express.Router();

router.put('/', async(req,res)=>{
    await populateStockDetails();
    res.json({result:'OK'});
});

router.get('/all', async(req,res)=>{
    const {limit = 10,skip = 0} = req.query;
    const allStocks = await allStocksModel.find({}).limit(limit).skip(skip);
    res.json({data: allStocks});
});

router.get('/:stockSymbol', async(req,res)=>{
    const stockDetails = await allStocksModel.findOne({stockSymbol: req.params.stockSymbol});
    res.json({stockDetails});
});

module.exports = router;