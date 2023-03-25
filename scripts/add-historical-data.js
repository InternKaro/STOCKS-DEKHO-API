const app  =require("./firebase")
const {getAuth} = require("firebase/auth")
const moment = require('moment');
const { parseCSVFromURL } = require('../toolbox/helpers');
const { getDatabase ,ref , push} = require('firebase/database');

const LocalCache = require('../toolbox/local-cache');
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
      const cache = new LocalCache();
      if(cache.get(url)){
        return {
          data: cache.get(url),
        }
      }
      parsedData = await parseCSVFromURL(url);
      cache.set(url,parsedData);
    } catch (error) {
      console.log(error);
    }
    return {
      data: parsedData,
    };
  }
const addHistoricalData=async()=>{

    const db = getDatabase(app);
    const reference = ref(db , 'StockHistoricalData/INFY')

    
    const response = await priceHistory({stockSymbol:"INFY" ,timeframe:730})
    // await set(reference,response)
    const data = JSON.stringify(response.data);
    // for (i=0 ; i<response.data.length;i++){
    //     console.log(response.data[i]['Date '])
    //     await push(reference , {Date:response.data[i]['Date '] , price:response.data[i]['PREV. CLOSE '] });
    // }
    await push(reference , data);
    return response.data
}

module.exports= addHistoricalData;