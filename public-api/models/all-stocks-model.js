const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AllStocksSchema = new Schema({
    symbol: String,
    name: String,
    listingDate: String,
    meta: Object,
    icon: String,
});

module.exports = mongoose.model("Stocks", AllStocksSchema);