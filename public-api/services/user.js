const BaseService = require('./base-service');
const BalanceModel = require('../models/balance-model');
const BadRequest = require('../../toolbox/errors/BadRequest');

class User extends BaseService{
    initialBalance
    constructor(props){
        super(props);
        this.initialBalance = 100000;
    }

    async signup(){
        const {userId, competetionId} = this.body;
        if(!userId){
            throw new BadRequest('UserId is required');
        }
        const balanceDetails = await BalanceModel.create({userId,balance: this.initialBalance,competetionId});
        return {balanceDetails};
    }
}
module.exports = User;
