const BaseService = require('./base-service');
const axios = require('axios');
const moment = require('moment');
const PriceTicksModel = require('../models/price-ticks');
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
    try {
        const data = await axios('https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20TOTAL%20MARKET',this.config);
        await PriceTicksModel.deleteMany({});
        await PriceTicksModel.insertMany(data.data.data);
        return{d: 'Done'};
    } catch (error) {
        console.log(error);
    }
};

}
module.exports = Price;
