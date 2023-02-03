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
    const data = await PriceTicksModel.findOne({symbol: stockSymbol});
    res.json({data})
});

module.exports = router;