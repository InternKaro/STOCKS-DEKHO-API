const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistoricalSchema = new Schema({
    Date: String,
    Data: Object,
  });

module.exports = mongoose.model("historicalDataByDate", HistoricalSchema,"historicalDataByDate");
