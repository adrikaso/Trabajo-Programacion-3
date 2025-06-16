const mongoose = require("mongoose");

const rolSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

module.exports = mongoose.model("Roles", rolSchema);