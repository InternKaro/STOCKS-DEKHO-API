const express = require('express');
const router = express.Router();
const News = require('../services/news');
const responseHandler = require('../../toolbox/helpers/response-handler');



router.get('/home',(req,res)=>{
    const newsService = new News(req);
    return responseHandler(newsService.homePageNews(),res);
})

router.get('/:stockSymbol',(req,res)=>{
    const newsService = new News(req);
    return responseHandler(newsService.newsByStockId(),res);
})

module.exports = router;