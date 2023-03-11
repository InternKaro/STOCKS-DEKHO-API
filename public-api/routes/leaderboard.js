const express = require('express');
const router = express.Router();
const LeaderBoard = require('../services/leaderboard');
const responseHandler = require('../../toolbox/helpers/response-handler');

router.get('/',(req,res)=>{
    const leaderBoardService = new LeaderBoard(req);
    return responseHandler(leaderBoardService.getLeaderBoard(),res);
})

module.exports = router;