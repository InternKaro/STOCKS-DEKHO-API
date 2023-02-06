const BaseService = require('./base-service');
const { AllStocksModel,PriceTicksModel } = require('../models');
const populateStockDetails = require('../../scripts/populate-stock-details');
const allStocksModel = require('../models/all-stocks-model');

class Stocks extends BaseService{
    constructor(props){
        super(props);
    }

    async getStockDetails(){
        const stockDetails = await AllStocksModel.findOne({symbol: this.params.stockSymbol});
        return {stockDetails};
    }
    async getAllStocksDetails(){
        const {limit = 10,skip = 0} = this.query;
        const allStocks = await AllStocksModel.find({}).limit(limit).skip(skip);
        return { allStocks };
    }
    async insertAllStocks(){
        const stockDetails = await AllStocksModel.find({});
        if(stockDetails){
        await AllStocksModel.deleteMany({});
        }
        await populateStockDetails();
        return {result:'OK'};
    }

    async deleteInActiveStocks(){
        const [allPriceTicks,allStockDetails] = await Promise.all([PriceTicksModel.find({}),AllStocksModel.find({})])
        const symbolsFromPriceTable = allPriceTicks.map((singlePriceTick) => {
            return singlePriceTick.symbol;
        })
        const symbolsFromAllStocksTable = allStockDetails.map((singleStock) => {
            return singleStock.symbol;
        })
        const  symbolsToBeDeleted = symbolsFromAllStocksTable.filter( symbol=> ! symbolsFromPriceTable.includes(symbol) )
        await AllStocksModel.deleteMany({symbol: { $in: symbolsToBeDeleted }});
        return {result: 'OK'};
    }
}
module.exports = Stocks;
