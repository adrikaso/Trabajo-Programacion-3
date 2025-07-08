const mongoose = require("mongoose");

const saleDetailsSchema = new mongoose.Schema({
  saleId: { type: mongoose.Schema.Types.ObjectId, ref: "Sale", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  subtotal: { type: Number, required: true }
});

module.exports = mongoose.model("SaleDetails", saleDetailsSchema);