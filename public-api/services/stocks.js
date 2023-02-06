const BaseService = require('./base-service');
const { AllStocksModel } = require('../models');
const populateStockDetails = require('../../scripts/populate-stock-details');

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
        //Defination.
        // Get all valid stocks from price table,
        // Delete all stocks which are not in price table from stocks table.
        return {result: 'OK'};
    }
}
module.exports = Stocks;
