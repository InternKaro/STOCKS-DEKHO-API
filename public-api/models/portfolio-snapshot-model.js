const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PortfolioSnapshotSchema = new Schema({
    userId: String,
    value: {type: Number, default: 1000000},
  },{
    timestamps: true,
  });

module.exports = mongoose.model("PortfolioSnapshot", PortfolioSnapshotSchema);