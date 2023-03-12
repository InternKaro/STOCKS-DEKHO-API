const BaseService = require('./base-service');
const moment = require('moment');
const { parseCSVFromURL } = require('../../toolbox/helpers');
const LocalCache = require('../../toolbox/local-cache');
class Graph extends BaseService {
  constructor(props) {
    super(props);
  }

  async priceHistory() {
    const { stockSymbol, timeframe } = this.query;
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
}
module.exports = Graph;
