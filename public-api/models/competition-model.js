const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompetitionSchema = new Schema({
    competitionId: String,
    startDate: Date,
    endDate: Date,
    entryAmount: Number,
    name: String,
    banner: String,
    meta: Object,
});
    
module.exports = mongoose.model("competition", CompetitionSchema);