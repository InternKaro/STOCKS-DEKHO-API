const BaseService = require('./base-service');
const BaseRequestService = require('../../toolbox/helpers/request-service/base-request-service');
const allStocksModel = require('../models/all-stocks-model');

class News extends BaseService{
    constructor(props){
        super(props);
        this.baseUrl = 'https://newsapi.org/v2';
        this.baseRequestServiceInstance = new BaseRequestService();
    }

    // const url = `https://newsapi.org/v2/everything?q=&from=2023-01-12&sortBy=publishedAt&apiKey=5818b09ebff64c32b408a0bb80069c5a`;
    async homePageNews(){
        let res = await this.baseRequestServiceInstance.get(`${this.baseUrl}/top-headlines`,{params:{
            country : 'in',
            category : 'business',
            apiKey : '5818b09ebff64c32b408a0bb80069c5a',
            q : 'Stocks'
        }});
        let data = res.data;
        return {data};
    }
    async newsByStockId(){
        const {stockSymbol} = this.params;
        const stockDetails = await allStocksModel.findOne({symbol:stockSymbol.toUpperCase()});
        if(!stockDetails){
           return {data:{}};
        }
        let res = await this.baseRequestServiceInstance.get(`${this.baseUrl}/everything`,{params:{
            apiKey : '5818b09ebff64c32b408a0bb80069c5a',
            
            q : stockDetails.name.toUpperCase()
        }});
        let data = res.data;
        return {data};
    }
}
module.exports = News;
