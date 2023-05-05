const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HoldingsSchema = new Schema({
    userId: String,
    holdings: {type: Object, default: {}},
    competetionId: { type: String, default: 1 },
  });

module.exports = mongoose.model("holdingsSchema", HoldingsSchema);
