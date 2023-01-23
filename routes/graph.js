const express = require('express');
const {generateFakePriceData} = require('../helpers')
const router = express.Router();

router.get('/:stockSymbol/:timeFrame', (req,res)=>{
    const {stockSymbol, timeFrame} = req.params;
    const graphHistory = {
        stockSymbol,
        prices: generateFakePriceData(timeFrame),
    };
    res.json(graphHistory);
});
module.exports = router;