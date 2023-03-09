const BaseService = require('./base-service');
const axios = require('axios');
const moment = require('moment');
const { WatchlistModel } = require('../models');


class Watchlist extends BaseService {
  constructor(props) {
    super(props);
  }

  async addSymbolToWatchlist() {
    const { stockSymbol,userId } = this.body;
   const existingWatchlist = await WatchlistModel.findOne({userId:userId.toString()});
   let existingWatchlistSymbols = [];
   if (existingWatchlist){
    existingWatchlistSymbols = existingWatchlist.stockSymbols;
   }
   
   existingWatchlistSymbols.push(stockSymbol);
   await WatchlistModel.deleteOne({userId:userId.toString()});
   const data = await WatchlistModel.create({stockSymbols:[ ...new Set(existingWatchlistSymbols) ],userId});
   return {data};
}
}
module.exports = Watchlist;
