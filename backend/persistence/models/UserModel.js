const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    rol: { type: mongoose.Schema.Types.ObjectId, ref: "Roles", required: true }
});

module.exports = mongoose.model("User", userScheme);