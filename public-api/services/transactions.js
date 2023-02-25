const BaseService = require('./base-service');
const axios = require('axios');
const { BalanceModel }= require('../models');
class Price extends BaseService {
  constructor(props) {
    super(props);
  }

  async  reviewBuy() {
    return {body: this.body}
};

}
module.exports = Price;