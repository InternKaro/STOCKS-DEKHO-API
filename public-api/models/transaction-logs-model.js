const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionLogsSchema = new Schema({
    userId: String, 
    stockSymbol: String, 
    orderAmount: Number,
    quantity: Number,
    type: {type: String, enum: ['BUY','SELL'], required: true},
    competetionId: { type: String, default: 1 },
  },
  {
    timestamps: true,
  });

module.exports = mongoose.model("TransactionLog", TransactionLogsSchema);
