const BaseService = require('./base-service');
const { AllStocksModel } = require('../models');

class Stocks extends BaseService{
    constructor(props){
        super(props);
    }

    async getStockDetails(){
        const stockDetails = await AllStocksModel.findOne({symbol: this.params.stockSymbol});
        return {stockDetails};
    }
    async getAllDetails(){
        const {limit = 10,skip = 0} = req.query;
    const allStocks = await AllStocksModel.find({}).limit(limit).skip(skip);
    return { allStocks };}
}
module.exports = Stocks;