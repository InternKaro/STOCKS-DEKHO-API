const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DumpDataSchema = new Schema({
    data: {
        type: Object
    },
});
    
module.exports = mongoose.model("dump", DumpDataSchema);