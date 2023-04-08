const BaseService = require('./base-service');
const { HoldingsModel, PriceTicksModel } = require('../models')

class LeaderBoard extends BaseService {
  constructor(props) {
    super(props);
  }

  async getSortedPortfolios() {
    // Get all holdings for all users
    const holdings = await HoldingsModel.find({});
  
    // Get the current price for each stock symbol
    const priceTicks = await PriceTicksModel.find({});
  
    // Create a map of stock symbols to their current price
    const priceMap = {};
    priceTicks.forEach((tick) => {
      priceMap[tick.symbol] = tick.lastPrice;
    });
  
    // Calculate the portfolio value for each user
    const portfolios = [];
    holdings.forEach((holding) => {
      let portfolioValue = 0;
      Object.keys(holding.holdings).forEach((symbol) => {
        const price = priceMap[symbol];
        const quantity = holding.holdings[symbol];
        portfolioValue += price * quantity;
      });
      portfolios.push({
        _id: holding.userId,
        portfolio_value: portfolioValue
      });
    });
  
    // Sort the portfolios by their value in descending order
    portfolios.sort((a, b) => b.portfolio_value - a.portfolio_value);
  
    return portfolios;
  }
  
}

module.exports = LeaderBoard;
