import BaseService from './base-service';
import axios from 'axios';
import PriceTicksModel from '../models/price-ticks';
export default class Price extends BaseService {
  constructor(props) {
    super(props);
  }
  config:{
    headers: Record<string,string>,
    method: string,
  } = {
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