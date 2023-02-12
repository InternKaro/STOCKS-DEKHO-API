const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PriceTicksSchema = new Schema({
    symbol: String,
    open: Number,
    dayHigh: Number,
    dayLow: Number,
    lastPrice: Number,
    previousClose: Number,
    change: String,
    pChange: String,
    totalTradedVolume: Number,
    totalTradedValue: Number,
    lastUpdateTime: Date,
    yearHigh: Number,
    ffmc: Number,
    yearLow: Number,
    nearWKH: Number,
    nearWKL: Number,
    perChange365d: String,
    perChange30d: String,
    meta: Object,
  });

module.exports = mongoose.model("PriceTicks", PriceTicksSchema);
