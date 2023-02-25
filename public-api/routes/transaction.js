const express = require('express');
const Transactions = require('../services/transactions');
const {validateRequest} = require('../../toolbox/requestValidator');
const {reviewBuyBody} = require('./../validations');
const responseHandler = require('../../toolbox/helpers/response-handler');

const router = express.Router();
router.post('/review/buy',validateRequest(reviewBuyBody,'body'),(req,res)=>{
    const transactionService = new Transactions(req);
    return responseHandler(transactionService.reviewBuy(),res);
})

router.post('/review/sell',(req,res)=>{
    const transactionService = new Transactions(req);
    return responseHandler(transactionService.reviewSell(),res);
})

module.exports = router;