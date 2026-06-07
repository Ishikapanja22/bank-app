const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const Admin = require("../models/Admin");
mongoose.connect(process.env.MONGO_URI);
const createAdmin = async () => {
const hashedPassword = await bcrypt.hash("ad123", 10);
await Admin.create({
username: "admin",
password: hashedPassword,
});
console.log("Admin Created");
process.exit();
};
createAdmin();
