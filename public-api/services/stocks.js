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
}
module.exports = Stocks;