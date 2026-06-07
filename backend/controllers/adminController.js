const Admin = require("../models/Admin");
const User = require("../models/User");
const Loan = require("../models/Loan");
const Transaction = require("../models/Transaction");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateAccountNumber = require("../utils/generateAccountNumber");
exports.adminLogin = async (req, res) => {
try {
const { username, password } = req.body;
const admin = await Admin.findOne({
username,
});
if (!admin) {
return res.status(400).json({
message: "Admin not found",
});
}
const isMatch = await bcrypt.compare(password, admin.password);
if (!isMatch) {
return res.status(400).json({
message: "Invalid credentials",
});
}
const token = jwt.sign(
{
id: admin._id,
},
process.env.JWT_SECRET,
);
res.json({
token,
});
} catch (error) {
console.log(error);
res.status(500).json({
message: "Login failed",
});
};
exports.dashboard = async (req, res) => {
try {
const totalUsers = await User.countDocuments({
isApproved: true,
});
const totalLoans = await Loan.countDocuments({
status: "approved",
});
const totalTransactions = await Transaction.countDocuments();
res.json({
totalUsers,
totalLoans,
totalTransactions,
});
} catch (error) {
console.log(error);
res.status(500).json({
message: "Dashboard fetch failed",
});
}
};
exports.getUsers = async (req, res) => {
try {
const users = await User.find().sort({
createdAt: -1,
});
res.json(users);
} catch (error) {
console.log(error);
res.status(500).json({
message: "Failed to fetch users",
});
}
};
exports.approveUser = async (req, res) => {
try {
const user = await User.findById(req.params.id);
if (!user) {
return res.status(404).json({
message: "User not found",
});
}
user.isApproved = true;
user.isActive = true;
user.accountNumber = await generateAccountNumber();
user.balance = 1000;
await user.save();
res.json({
message: "User approved successfully",
});
} catch (error) {
console.log(error);
res.status(500).json({
message: "Approval failed",
});
}
};
exports.deactivateUser = async (req, res) => {
try {
const user = await User.findById(req.params.id);
if (!user) {
return res.status(404).json({
message: "User not found",
});
}
user.isActive = false;
await user.save();
res.json({
message: "User deactivated",
});
} catch (error) {
console.log(error);
res.status(500).json({
message: "Deactivation failed",
});
}
};
exports.activateUser = async (req, res) => {
try {
const user = await User.findById(req.params.id);
if (!user) {
return res.status(404).json({
message: "User not found",
});
}
user.isActive = true;
await user.save();
res.json({
message: "User activated",
});
} catch (error) {
console.log(error);
res.status(500).json({
message: "Activation failed",
});
}
};
exports.getLoans = async (req, res) => {
try {
const loans = await Loan.find().populate("user").sort({
createdAt: -1,
});
res.json(loans);
} catch (error) {
console.log(error);
res.status(500).json({
message: "Failed to fetch loans",
});
}
};
exports.approveLoan = async (req, res) => {
try {
const loan = await Loan.findById(req.params.id);
if (!loan) {
return res.status(404).json({
message: "Loan not found",
});
}
if (loan.status === "approved") {
return res.status(400).json({
message: "Loan already approved",
});
}
loan.status = "approved";
await loan.save();
const user = await User.findById(loan.user);
user.balance = Number(user.balance) + Number(loan.amount);
user.loanAmount = Number(user.loanAmount) + Number(loan.amount);
await user.save();
res.json({
message: "Loan approved successfully",
});
} catch (error) {
console.log(error);
res.status(500).json({
message: "Loan approval failed",
});
}
};
exports.rejectLoan = async (req, res) => {
try {
const loan = await Loan.findById(req.params.id);

if (!loan) {
return res.status(404).json({
message: "Loan not found",
});
}
loan.status = "rejected";
await loan.save();
res.json({
message: "Loan rejected",
});
} catch (error) {
console.log(error);
res.status(500).json({
message: "Loan rejection failed",
});
}
};
exports.getTransactions = async (req, res) => {
try {
const transactions = await Transaction.find()
.populate("sender receiver")
.sort({
createdAt: -1,
});
res.json(transactions);
} catch (error) {
console.log(error);
res.status(500).json({
message: "Failed to fetch transactions",
});
}
};
}