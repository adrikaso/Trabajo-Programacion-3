const mongoose = require("mongoose");

const saleDetailsSchema = new mongoose.Schema({
  saleId: { type:String, required: true },
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  subtotal: { type: Number, required: true }
});

module.exports = mongoose.model("SaleDetails", saleDetailsSchema);