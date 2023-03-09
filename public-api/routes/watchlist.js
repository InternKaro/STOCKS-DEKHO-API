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

module.exports = router;