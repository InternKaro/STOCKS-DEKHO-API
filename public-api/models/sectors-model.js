const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SectorsSchema = new Schema({
    name: String,
    stocks: {type: Array, default: []},
  });

module.exports = mongoose.model("sector", SectorsSchema);
