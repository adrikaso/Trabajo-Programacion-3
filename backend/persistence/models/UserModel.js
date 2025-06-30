const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    rol: [{ type: mongoose.Schema.Types.ObjectId, ref: "Roles", required: true }],
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    sales: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sale" }]
});

module.exports = mongoose.model("User", userScheme);