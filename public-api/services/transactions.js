const BaseService = require('./base-service');
const { BalanceModel, PriceTicksModel, TransactionLogsModel,HoldingsModel }= require('../models');
const BadRequest = require('../../toolbox/errors/BadRequest');
class Price extends BaseService {
  buySpreadPercentage;
  sellSpreadPercentage
  constructor(props) {
    super(props);
    this.buySpreadPercentage = 0; // todo -> Change this variable to increase our cut in buy transactions.
    this.sellSpreadPercentage = 0 // todo -> Change this variable to increase our cut in sell transactions.
  }

  async updateHoldings(userId,stockSymbol,quantity, buy){
    const { competetionId } = this.query;
    quantity = parseInt(quantity);
    let holdings = await HoldingsModel.findOne({ userId, competetionId });
    if (!holdings) {
        holdings = new HoldingsModel({ userId, competetionId });
    }
    holdings.holdings[stockSymbol] = (holdings.holdings[stockSymbol] || 0) + (buy? quantity: -1 * quantity);
    holdings.markModified('holdings');
    await holdings.save();
  }
  

  calculateBuyOrderAmount(stockCurrentPrice, quantity){
    return (stockCurrentPrice * quantity * (100 + this.buySpreadPercentage))/100;
  }

  calculateSellOrderAmount(stockCurrentPrice, quantity){
    return (stockCurrentPrice * quantity * (100 + this.sellSpreadPercentage))/100;
  }

  async checkIfValidBuyOrder(transactionData){
    const {userBalance,stockCurrentPrice,quantity} = transactionData;
    if(this.calculateBuyOrderAmount(stockCurrentPrice,quantity) > userBalance){
      throw new BadRequest('You don`t have enough balance');
    }
  }

  async checkIfValidSellOrder(transactionData){
    const {userHoldings,quantity,stockSymbol} = transactionData;
    if(! userHoldings || !userHoldings.holdings[stockSymbol] || userHoldings.holdings[stockSymbol] < quantity){
      throw new BadRequest(`You have maximum ${ userHoldings && userHoldings.holdings[stockSymbol]} holdings`);
    }
  }

  async reviewBuy() {
    const { competetionId } = this.query;
    let { quantity, stockSymbol, userId } = this.body;
    quantity = parseInt(quantity);
    const [priceTick, userBalanceEntry] = await Promise.all([PriceTicksModel.findOne({symbol: stockSymbol}),BalanceModel.findOne({userId, competetionId})]);
    if(!priceTick){
      throw new BadRequest(`Price ticks not found for ${stockSymbol}`);
    }
    const {lastPrice: stockCurrentPrice} = priceTick;
    const {balance: userBalance} = userBalanceEntry;    
    if(!userBalance){
      throw new BadRequest(`UserBalance entry not found for ${userId}`);
    }
    await this.checkIfValidBuyOrder({userBalance,stockCurrentPrice,quantity});
    return {orderAmount: this.calculateBuyOrderAmount(stockCurrentPrice,quantity), quantity,stockSymbol }
  };

  async buy() {
    const { competetionId } = this.query;
    let { userId, stockSymbol, orderAmount,quantity } = this.body;
    quantity = parseInt(quantity);
    const balanceEntry = await BalanceModel.findOne({ userId });
    const {balance: currentBalance} = balanceEntry;
    return await Promise.all([ BalanceModel.updateOne({ userId,competetionId }, { $set:  { balance : parseFloat(currentBalance) - parseFloat(orderAmount) } }), TransactionLogsModel.create({competetionId,userId, stockSymbol, orderAmount, type: 'BUY', quantity}), await this.updateHoldings(userId, stockSymbol, quantity,true)]);
  }

  async reviewSell() {
    const { competetionId } = this.query;
    let { quantity, stockSymbol, userId } = this.body;
    quantity = parseInt(quantity);
    const [priceTick, userBalanceEntry, userHoldings] = await Promise.all([PriceTicksModel.findOne({symbol: stockSymbol}),BalanceModel.findOne({ userId,competetionId }),HoldingsModel.findOne({ userId,competetionId })]);
    if(!priceTick){
      throw new BadRequest(`Price ticks not found for ${stockSymbol}`);
    }
    const {lastPrice: stockCurrentPrice} = priceTick;
    const {balance: userBalance} = userBalanceEntry;  
    if(!userBalance){
      throw new BadRequest(`UserBalance entry not found for ${userId}`);
    }
    await this.checkIfValidSellOrder({userHoldings,quantity,stockSymbol});
    return {orderAmount: this.calculateSellOrderAmount(stockCurrentPrice,quantity), quantity,stockSymbol }
  };

  async sell() {
    const { competetionId } = this.query;
    let { userId, stockSymbol, orderAmount,quantity } = this.body;
    quantity = parseInt(quantity);
    const balanceEntry = await BalanceModel.findOne({ userId });
    const {balance: currentBalance} = balanceEntry;
    return await Promise.all([ BalanceModel.updateOne({ userId,competetionId }, { $set:  { balance : parseFloat(currentBalance) + parseFloat(orderAmount) } }), TransactionLogsModel.create({userId, stockSymbol, orderAmount, type: 'SELL',quantity,competetionId}), await this.updateHoldings(userId, stockSymbol, quantity,false)]);
  }

  async history(){
    const { competetionId } = this.query
    const {userId} = this.params;
    let { stockSymbol , type } = this.query;
    const filters = { userId , competetionId, ...stockSymbol?{stockSymbol}:{} , ...type?{type}:{} }
    const allTransactions = await TransactionLogsModel.find(filters).sort({ createdAt:-1 });
    return {allTransactions};
  }
  
}
module.exports = Price;