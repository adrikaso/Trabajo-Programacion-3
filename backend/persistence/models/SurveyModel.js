const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
    saleId:{ type: mongoose.Schema.Types.ObjectId, ref: "Sale", required: true },
    qualification: { type: Number, required: true },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Survey", surveySchema);