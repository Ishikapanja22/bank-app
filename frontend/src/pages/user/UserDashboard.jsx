import { Card, Row, Col, Tag } from "antd";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import UserLayout from "../../layouts/UserLayout";
const UserDashboard = () => {
const [user, setUser] = useState({});
useEffect(() => {
const getProfile = async () => {
try {
const res = await API.get("/user/profile");
setUser(res.data);
} catch (err) {
console.log(err);
}
};
getProfile();
}, []);
return (
<UserLayout>
<Row gutter={[20, 20]}>
<Col xs={24} sm={12} md={6}>
<Card className="shadow-lg rounded-xl h-[220px] flex flex-col justify-center">
<h2 className="text-xl font-semibold mb-6">Balance</h2>
<h1 className="text-5xl font-bold text-green-600">
₹ {user.balance}
</h1>
</Card>
</Col>
<Col xs={24} sm={12} md={6}>
<Card className="shadow-lg rounded-xl h-[220px] flex flex-col justify-center">
<h2 className="text-xl font-semibold mb-6">Total Loan Amount</h2>
<h1 className="text-5xl font-bold text-red-600">
₹ {user.loanAmount}
</h1>
</Card>
</Col>
<Col xs={24} sm={12} md={6}>
<Card className="shadow-lg rounded-xl h-[220px] flex flex-col justify-center">
<h2 className="text-xl font-semibold mb-6">Account Number</h2>
<h1 className="text-3xl font-bold">{user.accountNumber}</h1>
</Card>
</Col>
<Col xs={24} sm={12} md={6}>
<Card className="shadow-lg rounded-xl h-[220px] flex flex-col justify-center">
<h2 className="text-xl font-semibold mb-6">Status</h2>
<Tag
color={user.isActive ? "green" : "red"}
className="text-lg px-5 py-2 w-fit"
>
{user.isActive ? "ACTIVE" : "DEACTIVE"}
</Tag>
</Card>
</Col>
</Row>
</UserLayout>
);
};
export default UserDashboard;
