const BaseService = require('./base-service');
const axios = require('axios');
const PriceTicksModel = require('../models/price-ticks');
var csv2json = require("csvtojson");
var path = require('path');
class Price extends BaseService {
  constructor(props) {
    super(props);
  }
  config = {
    "headers": {
    },
    "method": "GET"
  };

  async  populateStockDetails() {
    const session = await axios.get('https://www.nseindia.com');
    this.config.headers.cookie = session.headers['set-cookie'].join(";");
    const filePath =  path.join(__dirname, '../../static/static.csv');
    const jsonArray= await csv2json().fromFile(filePath);
    const stockSymbolToCode = {};
    jsonArray.forEach((stock)=>{
      stockSymbolToCode[stock.name] = stock.code;
    });
    try {
        const data = await axios('https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20TOTAL%20MARKET',this.config);
        await PriceTicksModel.deleteMany({});
        const stockData = data.data.data.map(stock =>{
          return {
            ...stock,
            icon: `https://assets-netstorage.groww.in/stock-assets/logos/GSTK${stockSymbolToCode[stock.symbol]}.png`
          }
        });
        await PriceTicksModel.insertMany(stockData);
        return{d: 'Done'};
    } catch (error) {
        console.log(error);
    }
};

}
module.exports = Price;