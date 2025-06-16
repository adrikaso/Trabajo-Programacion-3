const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  pictureurURL: { type: String, required: true },
  categorY: { type: String, enum: ["suplemento", "accesorio"], required: true },
  active: { type: Boolean, default: true }
});



module.exports = mongoose.model("Product", productSchema);
