const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  clientName: { type: String, default: "" },
  date: { type: Date, default: Date.now },
  total: { type: Number, required: true }
});

module.exports = mongoose.model("Sale", saleSchema);