const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
{
fullName: String,
email: {
type: String,
unique: true,
},
password: String,
accountNumber: {
type: String,
default: null,
},
balance: {
type: Number,
default: 0,
},
loanAmount: {
type: Number,
default: 0,
},
isApproved: {
type: Boolean,
default: false,
},
isActive: {
type: Boolean,
default: false,
},
},
{ timestamps: true },
);
module.exports = mongoose.model("User", userSchema);
