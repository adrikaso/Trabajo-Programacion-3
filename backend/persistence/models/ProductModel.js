const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  pictureURL: { type: String, required: true },
  category: { type : mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  active: { type: Boolean, default: true }
});



module.exports = mongoose.model("Product", productSchema);
