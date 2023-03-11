const express = require('express');
const Wallet = require('../services/wallet')
const router = express.Router();
const responseHandler = require('../../toolbox/helpers/response-handler');




router.get('/:userId',(req,res)=>{
    const walletService = new Wallet(req);
    return responseHandler(walletService.getUserBalance(),res);
});

module.exports = router;