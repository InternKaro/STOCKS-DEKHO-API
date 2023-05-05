const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BalanceSchema = new Schema({
    userId: String,
    balance: Number,
    competetionId: { type: String, default: 1 },
});

module.exports = mongoose.model("Balance", BalanceSchema);