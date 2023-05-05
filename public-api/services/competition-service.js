const { CompetitionModel } = require('../models');
const BadRequest = require('../../toolbox/errors/BadRequest');
const BaseService = require('./base-service');
class Competition extends BaseService {
    constructor(props){
        super(props);
    }
    async createCompetition(){
        const { competitionId, startDate, endDate, entryAmount, name, banner, meta } = this.body;
        if(!competitionId || !startDate || !endDate || !entryAmount || !name || !banner){
            throw new BadRequest('competitionId,startDate,endDate,entryAmount,name,banner are required');
        }
        CompetitionModel.create({ competitionId, startDate, endDate, entryAmount, name, banner, meta });
    }
    async getAllCompetitions(){
        // add pagination some time in future
        return CompetitionModel.find({}).sort({ endDate: -1});
    }
    async getCompetition(){
        const { competitionId } = this.query;
        return CompetitionModel.findOne({ competitionId });
    }
}

module.exports = Competition;