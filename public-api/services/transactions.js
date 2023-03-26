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
    quantity = parseInt(quantity);
    let holdings = await HoldingsModel.findOne({ userId });
    if (!holdings) {
        holdings = new HoldingsModel({ userId });
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
    if(! userHoldings || userHoldings.holdings[stockSymbol] < quantity){
      throw new BadRequest(`You have maximum ${ userHoldings && userHoldings.holdings[stockSymbol]} holdings`);
    }
  }

  async reviewBuy() {
    const { quantity, stockSymbol, userId } = this.body;
    const [priceTick, userBalanceEntry] = await Promise.all([PriceTicksModel.findOne({symbol: stockSymbol}),BalanceModel.findOne({userId})]);
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
    const { userId, stockSymbol, orderAmount,quantity } = this.body;
    const balanceEntry = await BalanceModel.findOne({ userId });
    const {balance: currentBalance} = balanceEntry;
    return await Promise.all([ BalanceModel.updateOne({ userId }, { $set:  { balance : parseFloat(currentBalance) - parseFloat(orderAmount) } }), TransactionLogsModel.create({userId, stockSymbol, orderAmount, type: 'BUY', quantity}), await this.updateHoldings(userId, stockSymbol, quantity,true)]);
  }

  async reviewSell() {
    const { quantity, stockSymbol, userId } = this.body;
    const [priceTick, userBalanceEntry, userHoldings] = await Promise.all([PriceTicksModel.findOne({symbol: stockSymbol}),BalanceModel.findOne({ userId }),HoldingsModel.findOne({ userId })]);
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
    const { userId, stockSymbol, orderAmount,quantity } = this.body;
    const balanceEntry = await BalanceModel.findOne({ userId });
    const {balance: currentBalance} = balanceEntry;
    return await Promise.all([ BalanceModel.updateOne({ userId }, { $set:  { balance : parseFloat(currentBalance) + parseFloat(orderAmount) } }), TransactionLogsModel.create({userId, stockSymbol, orderAmount, type: 'SELL',quantity}), await this.updateHoldings(userId, stockSymbol, quantity,false)]);
  }

  async history(){
    const {userId} = this.params;
    let {stockSymbol , type} = this.query;
    if(type == null){
      type ="";
    }
    // type= sell
    if (type!='BUY' && type!= 'SELL' && type!="" ){
      throw new BadRequest("support only BUY/SELL type")
    }
    const filters = {userId , ...stockSymbol?{stockSymbol}:{} , ...type?{type}:{} }
    
    const allTransactions = await TransactionLogsModel.find(filters).sort({createdAt:-1});
    return {allTransactions};
  }
  
}
module.exports = Price;