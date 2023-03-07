const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WatchlistSchema = new Schema({
    userId: String,
    stockSymbols: Array,
});

module.exports = mongoose.model("Watchlist", WatchlistSchema);
