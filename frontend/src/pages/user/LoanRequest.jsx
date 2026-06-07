import { Form, Input, Button, Card, message, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import UserLayout from "../../layouts/UserLayout";
const LoanRequest = () => {
const [loans, setLoans] = useState([]);
const fetchLoans = async () => {
try {
const res = await API.get("/user/my-loans");
setLoans(res.data);
} catch (err) {
console.log(err);
}
};
useEffect(() => {
const loadLoans = async () => {
await fetchLoans();
};
loadLoans();
}, []);
const onFinish = async (values) => {
try {
await API.post("/user/loan-request", values);
message.success("Loan Request Sent");
fetchLoans();
} catch (err) {
console.log(err);
message.error("Request Failed");
}
};
const columns = [
{
title: "Amount",
dataIndex: "amount",
},
{
title: "Purpose",
dataIndex: "purpose",
},
{
title: "Status",
render: (_, record) => (
<Tag
color={
record.status === "approved"
? "green"
: record.status === "rejected"
? "red"
: "orange"
}
>
{record.status.toUpperCase()}
</Tag>
),
},
{
title: "Admin Message",
render: (_, record) => {
if (record.status === "approved") {
return (
<span className="text-green-600 font-semibold">
Admin approved your loan request
</span>
);
}
if (record.status === "rejected") {
return (
<span className="text-red-600 font-semibold">
Admin rejected your loan request
</span>
);
}
return (
<span className="text-orange-500 font-semibold">
Waiting for admin approval
</span>
);
},
},
];
return (
<UserLayout>
<Card title="Request Loan" className="mb-6">
<Form layout="vertical" onFinish={onFinish}>
<Form.Item label="Amount" name="amount">
<Input />
</Form.Item>
<Form.Item label="Purpose" name="purpose">
<Input />
</Form.Item>
<Button type="primary" htmlType="submit">
Request Loan
</Button>
</Form>
</Card>
<Card title="My Loan Requests">
<Table columns={columns} dataSource={loans} rowKey="_id" />
</Card>
</UserLayout>
);
};
export default LoanRequest;
