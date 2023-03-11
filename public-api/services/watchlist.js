const BaseService = require('./base-service');
const axios = require('axios');
const moment = require('moment');
const { WatchlistModel } = require('../models');
const AllStocksModel = require('../models/all-stocks-model');


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
    async getWatchlist(){
      const {userId} = this.params;
      const watchlist = await WatchlistModel.findOne({userId});
      return {watchlist:watchlist.stockSymbols};
  }

  async deleteWatchlist(stockSymbol){
    const {userId} = this.params;
    const {watchlist} = await this.getWatchlist();
    const result = watchlist.filter((symbol)=>symbol!=stockSymbol);
    console.log(result);
    await WatchlistModel.deleteOne({userId:userId.toString()});
    const data = await WatchlistModel.create({stockSymbols:[...result],userId});
    return {data};

  }
}

module.exports = Watchlist;
