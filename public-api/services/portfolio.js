const { object } = require('joi');
const { HoldingsModel, PriceTicksModel , SectorModel } = require('../models');
const BaseService = require('./base-service');
const StocksService = require('./stocks'); 
const stockList = require('../../toolbox/stock-list');
class Portfolio extends BaseService{
    constructor(props){
        super(props);
    }
    async getHoldingBySector(){
        const sectorData = await SectorModel.find({});
        const sectorList = sectorData.map((sector)=>{
            return {name :sector.name,
                    stocks: sector.stocks}
            
        })
        
        const { userId } = this.params;
        const userHoldingsMongo = await HoldingsModel.findOne({userId});
        const { holdings } = userHoldingsMongo;
        const stockSymbolsHeld = Object.keys(holdings);
        const response = {};
        stockSymbolsHeld.map((stock)=>{
            console.log(stock);
            const sector = sectorList.find(sector=>sector.stocks.includes(stock))
            if(sector){
                if(!response[sector.name]){
                    response[sector.name] = 0;
                }
                response[sector.name]+=1;
            }
        })
        return { data: response };
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
        let portfolio_value = 0
        const response = [];
        Object.keys(holdings).forEach(symbol => {
            portfolio_value+= (currentPriceTicks[symbol].lastPrice*parseInt(holdings[symbol]))
            response.push({stockSymbol: symbol,quantity: holdings[symbol], value: (currentPriceTicks[symbol].lastPrice*parseInt(holdings[symbol])).toFixed(2),stockDetails: currentPriceTicks[symbol]});
        });
        return { holdings: response , portfolio_value:portfolio_value  };
    }
}

module.exports = Portfolio;