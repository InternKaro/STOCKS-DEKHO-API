const { HoldingsModel, PriceTicksModel } = require('../models');
const BaseService = require('./base-service');

class Portfolio extends BaseService{
    constructor(props){
        super(props);
    }
    async getHoldings(){
        const { userId } = this.params;
        const userHoldingsMongo = await HoldingsModel.findOne({userId});
        const { holdings } = userHoldingsMongo;
        const stockSymbolsHeld = Object.keys(holdings);
        let currentPriceTicks = await PriceTicksModel.find({symbol:{$in:stockSymbolsHeld}});
        currentPriceTicks = currentPriceTicks.reduce(
        (acc, priceTick) => {return {...acc, [priceTick.symbol]: priceTick}},
        {}
        );
        const response = [];
        Object.keys(holdings).forEach(symbol => {
            response.push({stockSymbol: symbol,quantity: holdings[symbol], value: (currentPriceTicks[symbol].lastPrice*parseInt(holdings[symbol])).toFixed(2),stockDetails: currentPriceTicks[symbol]});
        });
        return { holdings: response };
    }
}

module.exports = Portfolio;