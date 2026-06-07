const User = require("../models/User");
const generateAccountNumber = async () => {
let accountNumber;
let existingUser;
do {
accountNumber = Math.floor(
1000000000 + Math.random() * 9000000000,
).toString();
existingUser = await User.findOne({
accountNumber,
});
} while (existingUser);
return accountNumber;
};
module.exports = generateAccountNumber;
