const BaseService = require('./base-service');
const moment = require('moment');
const { parseCSVFromURL } = require('../../toolbox/helpers');
const LocalCache = require('../../toolbox/local-cache');
const { FirebaseAccessors } = require('../db/firebase/accessors');
class Graph extends BaseService {
  constructor(props) {
    super(props);
  }

  async fetchHistoricalDataFromNSE(){
    const maxDays = 750;
    const from = moment()
      .subtract(maxDays, 'days')
      .subtract(1, 'day')
      .format('DD-MM-YYYY');
    const to = moment().format('DD-MM-YYYY');
    const url = `https://www.nseindia.com/api/historical/cm/equity?symbol=${stockSymbol}&series=[%22EQ%22]&from=${from}&to=${to}&csv=true`;
    let parsedData = [];
    try {
      parsedData = await parseCSVFromURL(url);
    } catch (error) {
      console.log(error);
    }
    return parsedData;
  }

  async priceHistory() {
    const { stockSymbol } = this.query;
    const firebaseAccessors = new FirebaseAccessors();
    let data = await firebaseAccessors.getHistoricalData(stockSymbol);
    if(!data){
      data = await this.fetchHistoricalDataFromNSE();
      await firebaseAccessors.setHistoricalData(stockSymbol,data);
    }
    return { data };
  }
}
module.exports = Graph;
