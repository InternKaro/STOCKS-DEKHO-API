import BaseService from './base-service';

import moment from 'moment';
import { parseCSVFromURL } from '../../toolbox/helpers';
export default class Graph extends BaseService {
  constructor(props) {
    super(props);
  }

  async priceHistory() {
    const { stockSymbol } = this.params;
    const from = moment()
      .subtract(2, 'years')
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
}

