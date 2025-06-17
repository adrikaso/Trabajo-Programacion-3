const mongoose = require("mongoose");

const itemCartSchema = new mongoose.Schema({
    shopingCartId: { type: mongoose.Schema.Types.ObjectId, ref: "ShopingCart", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    productName: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

module.exports = mongoose.model("ItemCart", itemCartSchema);