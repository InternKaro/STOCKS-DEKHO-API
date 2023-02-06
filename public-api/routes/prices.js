const axios = require('axios');
const express = require('express');
const responseHandler = require('../../toolbox/helpers/response-handler');
const router = express.Router();
const {PriceTicksModel} = require('../models');
const config = {
    "headers": {
    },
    "method": "GET"
  };


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

async function populateStockDetails() {
    const session = await axios.get('https://www.nseindia.com');
    config.headers.cookie = session.headers['set-cookie'].join(";");
    try {
        const data = await axios('https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20TOTAL%20MARKET',config);
        await PriceTicksModel.deleteMany({});
        await PriceTicksModel.insertMany(data.data.data);
        return{d: 'Done'};
    } catch (error) {
        console.log(error);
    }
};

router.put('/', (req,res)=>{
    return responseHandler(populateStockDetails(),res);
});

router.get('/', async (req,res)=>{
    const data = await PriceTicksModel.find({});
    res.json({data})
});

router.get('/:stockSymbol', async (req,res)=>{
    const {stockSymbol} = req.params;
    let data = await PriceTicksModel.findOne({symbol: stockSymbol}) || buildDefaultPriceResponse(stockSymbol);
    res.json({data})
});

module.exports = router;