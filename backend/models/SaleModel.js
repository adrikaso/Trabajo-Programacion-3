const mongoose = require("mongoose");

const ventaSchema = new mongoose.Schema({
  clienteNombre: { type: String, default: "" },
  fecha: { type: Date, default: Date.now },
  total: { type: Number, required: true }
});

module.exports = mongoose.model("Venta", ventaSchema);