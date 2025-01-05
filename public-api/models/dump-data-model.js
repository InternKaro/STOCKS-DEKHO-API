const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DumpDataSchema = new Schema({
    apId: String,
});
    
module.exports = mongoose.model("dump", DumpDataSchema);