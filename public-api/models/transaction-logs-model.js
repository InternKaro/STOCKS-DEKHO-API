const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionLogsSchema = new Schema({
    userId: String, 
    stockSymbol: String, 
    orderAmount: Number,
    type: {type: String, enum: ['BUY','SELL'], required: true},
  },
  {
    timestamps: true,
  });

module.exports = mongoose.model("TransactionLog", TransactionLogsSchema);
