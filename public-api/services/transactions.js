const BaseService = require('./base-service');
const { BalanceModel, PriceTicksModel, TransactionLogsModel }= require('../models');
const BadRequest = require('../../toolbox/errors/BadRequest');
class Price extends BaseService {
  buySpreadPercentage;
  sellSpreadPercentage
  constructor(props) {
    super(props);
    this.buySpreadPercentage = 0; // todo -> Change this variable to increase our cut in buy transactions.
    this.sellSpreadPercentage = 0 // todo -> Change this variable to increase our cut in sell transactions.
  }

  async calculateBuyOrderAmount(stockCurrentPrice, quantity){
    return (stockCurrentPrice * quantity * (100 + this.buySpreadPercentage))/100;
  }

  async calculateSellOrderAmount(stockCurrentPrice, quantity){
    return (stockCurrentPrice * quantity * (100 + this.sellSpreadPercentage))/100;
  }

  async checkIfValidBuyOrder(transactionData){
    const {userBalance,stockCurrentPrice,quantity} = transactionData;
    if(this.calculateBuyOrderAmount(stockCurrentPrice,quantity) > userBalance){
      throw new BadRequest('You don`t have enough balance');
    }
  }

  async reviewBuy() {
    const { quantity, stockSymbol, userId } = this.body;
    const [priceTick, userBalanceEntry] = await Promise.all([PriceTicksModel.findOne({symbol: stockSymbol}),BalanceModel.findOne({userId})]);
    const {lastPrice: stockCurrentPrice} = priceTick;
    const {balance: userBalance} = userBalanceEntry;    
    if(!stockCurrentPrice){
      throw new BadRequest(`Price ticks not found for ${stockSymbol}`);
    }
    if(!userBalance){
      throw new BadRequest(`UserBalance entry not found for ${userId}`);
    }
    await this.checkIfValidBuyOrder({userBalance,stockCurrentPrice,quantity});
    return {orderAmount: await this.calculateBuyOrderAmount(stockCurrentPrice,quantity), quantity,stockSymbol }
  };

  async buy() {
    const { userId, stockSymbol, orderAmount } = this.body;
    const balanceEntry = await BalanceModel.findOne({ userId });
    const {balance: currentBalance} = balanceEntry;
    return await Promise.all([ BalanceModel.updateOne({ userId }, { $set:  { balance : currentBalance - orderAmount } }), TransactionLogsModel.create({userId, stockSymbol, orderAmount, type: 'BUY'}), await this.updateHoldings()]);
  }

}
module.exports = Price;