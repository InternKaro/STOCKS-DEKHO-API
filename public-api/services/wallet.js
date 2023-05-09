const BaseService = require('./base-service');
const { BalanceModel } = require('../models')
class Wallet extends BaseService {
  constructor(props) {
    super(props);
  }

  async getUserBalance() {
    const { userId } = this.params;
    const userBalance = await BalanceModel.findOne({userId,competetionId})
    return {data: userBalance };
  }
}
module.exports = Wallet;
