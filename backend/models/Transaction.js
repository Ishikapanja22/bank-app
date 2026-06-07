const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema(
{
sender: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
},
receiver: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
},
amount: Number,
status: {
type: String,
default: "success",
},
},
{ timestamps: true },
);
module.exports = mongoose.model("Transaction", transactionSchema);
