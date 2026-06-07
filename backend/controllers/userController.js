const User = require("../models/User");
const Loan = require("../models/Loan");
const Transaction = require("../models/Transaction");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.registerUser = async (req, res) => {
try {
const { fullName, email, password } = req.body;
const existingUser = await User.findOne({ email });
if (existingUser) {
return res.status(400).json({
message: "User already exists",
});
}
const hashedPassword = await bcrypt.hash(password, 10);
await User.create({
fullName,
email,
password: hashedPassword,
});
res.json({
message: "Request sent to admin",
});
} catch (error) {
res.status(500).json(error);
}
};
exports.loginUser = async (req, res) => {
try {
const { email, password } = req.body;
const user = await User.findOne({
email,
});
if (!user) {
return res.status(400).json({
message: "User not found",
});
}
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
return res.status(400).json({
message: "Invalid credentials",
});
}
if (user.isApproved && !user.isActive) {
return res.status(403).json({
message: "Your account has been deactivated by admin",
});
}
const token = jwt.sign(
{
id: user._id,
},
process.env.JWT_SECRET,
);
res.json({
token,
user,
});
} catch (error) {
console.log(error);
res.status(500).json({
message: "Login failed",
});
}
};
exports.getProfile = async (req, res) => {
try {
const user = await User.findById(req.user.id);

res.json(user);
} catch (error) {
res.status(500).json(error);
}
};
exports.transferMoney = async (req, res) => {
try {
const { receiverAccountNumber, amount } = req.body;
if (!receiverAccountNumber || !amount) {
return res.status(400).json({
message: "All fields are required",
});
}
const sender = await User.findById(req.user.id);
if (!sender) {
return res.status(404).json({
message: "Sender not found",
});
}
if (!sender.isActive) {
return res.status(400).json({
message: "Your account is deactivated",
});
}
const receiver = await User.findOne({
accountNumber: receiverAccountNumber,
});
if (!receiver) {
return res.status(404).json({
message: "Receiver account not found",
});
}
if (!receiver.isActive) {
return res.status(400).json({
message: "Receiver account is deactivated",
});
}
if (sender.accountNumber === receiverAccountNumber) {
return res.status(400).json({
message: "Cannot transfer to same account",
});
}
if (sender.balance < Number(amount)) {
return res.status(400).json({
message: "Insufficient balance",
});
}
sender.balance = Number(sender.balance) - Number(amount);
receiver.balance = Number(receiver.balance) + Number(amount);
await sender.save();
await receiver.save();
await Transaction.create({
sender: sender._id,
receiver: receiver._id,
amount: Number(amount),
});
res.status(200).json({
success: true,
message: "Money transferred successfully",
});
} catch (error) {
console.log(error);
res.status(500).json({
message: "Transfer failed",
});
}
};
exports.requestLoan = async (req, res) => {
try {
const { amount, purpose } = req.body;
await Loan.create({
user: req.user.id,
amount,
purpose,
});
res.json({
message: "Loan request sent",
});
} catch (error) {
res.status(500).json(error);
}
};
exports.transactionHistory = async (req, res) => {
try {
const transactions = await Transaction.find({
$or: [
{
sender: req.user.id,
},
{
receiver: req.user.id,
},
],
})
.populate("sender receiver")
.sort({
createdAt: -1,
});
res.json(transactions);
} catch (error) {
res.status(500).json(error);
}
};
exports.getUserLoans = async (req, res) => {
try {
console.log("Current User:", req.user.id);
const loans = await Loan.find({
user: req.user.id,
})
.populate("user", "fullName email")
.sort({
createdAt: -1,
});
res.json(loans);
} catch (error) {
console.log(error);
res.status(500).json({
message: "Failed to fetch user loans",
});
}
};
