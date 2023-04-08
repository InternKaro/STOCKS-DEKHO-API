const express = require('express');
const router = express.Router();
const LeaderBoard = require('../services/leader-board');
const responseHandler = require('../../toolbox/helpers/response-handler');

router.get('/',(req,res)=>{
    const leaderBoardService = new LeaderBoard(req);
    return responseHandler(leaderBoardService.getSortedPortfolios(),res);
})

module.exports = router;