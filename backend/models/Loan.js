const mongoose = require("mongoose");
const loanSchema = new mongoose.Schema(
{
user: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
},
amount: Number,
purpose: String,
status: {
type: String,
default: "pending",
},
},
{ timestamps: true },
);
module.exports = mongoose.model("Loan", loanSchema);
