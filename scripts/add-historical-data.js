const moment = require('moment');
const { parseCSVFromURL } = require('../toolbox/helpers');
const { FirebaseAccessors }  = require('../public-api/db/firebase/accessors');
const stockList = require('../toolbox/stock-list');

async function priceHistory(query) {
    const { stockSymbol, timeframe } = query;
    const from = moment()
      .subtract(timeframe, 'days')
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
    return {
      data: parsedData,
    };
  }
const addHistoricalData = async() => {
    const firebaseAccessors = new FirebaseAccessors();
    for(const symbol of stockList){
      const response = await priceHistory({stockSymbol:symbol ,timeframe:730});
      const data = response.data;
      await firebaseAccessors.setHistoricalData(symbol,data);
    }
}

module.exports= addHistoricalData;