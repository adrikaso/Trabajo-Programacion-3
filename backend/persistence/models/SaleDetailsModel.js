const mongoose = require("mongoose");

const detalleVentaSchema = new mongoose.Schema({
  ventaId: { type: mongoose.Schema.Types.ObjectId, ref: "Venta", required: true },
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
  cantidad: { type: Number, required: true },
  subtotal: { type: Number, required: true }
});

module.exports = mongoose.model("DetalleVenta", detalleVentaSchema);