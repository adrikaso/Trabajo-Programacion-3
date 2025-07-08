const mongoose = require("mongoose");

const shopingCartSchema = new mongoose.Schema({
    name: { type: String, required: true },
    total: { type: Number, required: true }
});

module.exports = mongoose.model("ShopingCart", shopingCartSchema);