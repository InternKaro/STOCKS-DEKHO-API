const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HoldingsSchema = new Schema({
    userId: String,
    holdings: {type: Object, default: {}},
  });

module.exports = mongoose.model("holdingsSchema", HoldingsSchema);
