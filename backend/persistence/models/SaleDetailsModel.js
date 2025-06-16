const mongoose = require("mongoose");

const saleDetailsSchema = new mongoose.Schema({
  saleId: { type: mongoose.Schema.Types.ObjectId, ref: "Venta", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
  quantity: { type: Number, required: true },
  subtotal: { type: Number, required: true }
});

module.exports = mongoose.model("SaleDetails", saleDetailsSchema);