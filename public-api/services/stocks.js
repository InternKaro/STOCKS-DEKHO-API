const BaseService = require('./base-service');
const { AllStocksModel,PriceTicksModel, SectorModel } = require('../models');
const populateStockDetails = require('../../scripts/populate-stock-details');
const { FirebaseAccessors } = require('../db/firebase/accessors');
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
    
    async getAllSectors(){
        const sectorData = await SectorModel.find({});
        const response = sectorData.map((sector)=>{
            return {
                name: sector.name,
                total: sector.stocks.length - 1,
            }
        })
        return {data: response};
    }

    async getAllStocksBySector(){
        const { sector } = this.params;
        const sectorDetails = await SectorModel.findOne({name: sector});
        const [index,...stockSymbolsInSector] = sectorDetails.stocks;
        let currentPriceTicks = await PriceTicksModel.find({symbol:{$in:stockSymbolsInSector}});
        currentPriceTicks = currentPriceTicks.reduce(
        (acc, priceTick) => {return {...acc, [priceTick.symbol]: priceTick}},
        {}
        );
        const response = stockSymbolsInSector.map(symbol => {
            return currentPriceTicks[symbol];
        });
        return { data: response };
    }

    async getHistoricalData(){
        const { symbol } = this.params;
        const firebaseAccessors = new FirebaseAccessors();
        let data = await firebaseAccessors.getHistoricalData(symbol);
        return data;
    }
}
module.exports = Stocks;
