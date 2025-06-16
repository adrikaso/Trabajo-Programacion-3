const mongoose = require("mongoose");

const userLogSchema = new mongoose.Schema({
    userId : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    action: { type: String, required: true }
});

module.exports = mongoose.model("UserLog", userLogSchema);