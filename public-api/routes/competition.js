const express = require('express');
const responseHandler = require('../../toolbox/helpers/response-handler');
const Competition = require('../services/competition-service');
const router = express.Router();

router.put('/', (req,res)=>{
    const competitionService = new Competition(req);
    return responseHandler(competitionService.createCompetition(),res)
});

router.get('/all', (req,res)=>{
    const competitionService = new Competition(req);
    return responseHandler(competitionService.getAllCompetitions(),res)
});

router.get('/', (req,res)=>{
    const competitionService = new Competition(req);
    return responseHandler(competitionService.getCompetition(),res)
});

module.exports = router;