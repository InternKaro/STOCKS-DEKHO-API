const express = require('express');
const router = express.Router();
const Watchlist = require('../services/watchlist');
const responseHandler = require('../../toolbox/helpers/response-handler');

router.put('/',(req,res)=>{
    const watchlistService = new Watchlist(req);
    return responseHandler(watchlistService.addSymbolToWatchlist(),res);
})

router.get('/:userId',(req,res)=>{
    const watchlistService = new Watchlist(req);
    return responseHandler(watchlistService.getWatchlist(),res);
})

router.put('/:userId',(req,res)=>{
    const watchlistService = new Watchlist(req);
    return responseHandler(watchlistService.deleteWatchlist(req.body.stockSymbol),res);
})

router.get('/check/:userId' , (req,res)=>{
    const watchlistService = new Watchlist(req);
    return responseHandler(watchlistService.checkInWatchList() , res);
})
module.exports = router;