const axios = require('axios');
const express = require('express');
const responseHandler = require('../../toolbox/helpers/response-handler');
const Price = require('../services/price');
const router = express.Router();
const {PriceTicksModel} = require('../models');

function buildDefaultPriceResponse(stockSymbol){
    return {
        "_id": "63d3cf1a9acce2ba9f960903",
        "symbol": stockSymbol,
        "open": 438,
        "dayHigh": 453.4,
        "dayLow": 435.15,
        "lastPrice": 445.25,
        "previousClose": 419.05,
        "change": "26.2",
        "pChange": "6.25",
        "totalTradedVolume": 63360467,
        "totalTradedValue": 28185903744.95,
        "lastUpdateTime": "2023-01-27T10:29:53.000Z",
        "yearHigh": 520,
        "ffmc": 799182141266.02,
        "yearLow": 366.2,
        "nearWKH": 14.375,
        "nearWKL": -21.586564718732937,
        "perChange365d": "-14.58",
        "perChange30d": "6.32",
        "meta": {
            "symbol": stockSymbol,
            "companyName": stockSymbol,
            "industry": stockSymbol,
            "activeSeries": [
                "EQ"
            ],
            "debtSeries": [],
            "tempSuspendedSeries": [],
            "isFNOSec": true,
            "isCASec": false,
            "isSLBSec": true,
            "isDebtSec": false,
            "isSuspended": false,
            "isETFSec": false,
            "isDelisted": false,
            "isin": "INE155A01022"
        },
        "__v": 0
    };
}

router.put('/', (req,res)=>{
    const priceService = new Price(req);
    return responseHandler(priceService.populateStockDetails(),res);
});

router.get('/', async (req,res)=>{
    const {limit = 10,skip = 0} = req.query;
    const data = await PriceTicksModel.find({}).limit(limit).skip(skip);
    res.json({data})
});

router.get('/search', async (req,res)=>{
    const {limit = 10,skip = 0} = req.query;
    const {symbol} = req.query;
    const regex = new RegExp(symbol, 'i');
    let data = await PriceTicksModel.find({symbol:{ $regex: regex }}).limit(limit).skip(skip);
    res.json({data})
});

router.get('/top-gainers', async (req,res)=>{
    const {limit = 7} = req.query;
    let data = await PriceTicksModel.find({}).sort({pChange: -1}).limit(limit);
    res.json({data})
});

router.get('/top-loosers', async (req,res)=>{
    const {limit = 7} = req.query;
    let data = await PriceTicksModel.find({}).sort({pChange: 1}).limit(limit);
    res.json({data})
});

router.get('/most-active', async (req,res)=>{
    const {limit = 8} = req.query;
    let [niftyIndexData, ...data] = await PriceTicksModel.find({}).sort({totalTradedVolume: -1}).limit(limit);
    res.json({data})
});

router.get('/:stockSymbol', async (req,res)=>{
    const {stockSymbol} = req.params;
    let data = await PriceTicksModel.findOne({symbol: stockSymbol}) || buildDefaultPriceResponse(stockSymbol);
    res.json({data})
});


module.exports = router;