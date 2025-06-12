const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String, required: true },
  categoria: { type: String, enum: ["suplemento", "accesorio"], required: true },
  activo: { type: Boolean, default: true }
});



module.exports = mongoose.model("Producto", productoSchema);
