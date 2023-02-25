const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BalanceSchema = new Schema({
    userId: String,
    balance: Number,
});

module.exports = mongoose.model("Balance", BalanceSchema);