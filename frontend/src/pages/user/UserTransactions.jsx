import { Table, Tag, Card } from "antd";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import UserLayout from "../../layouts/UserLayout";
const UserTransactions = () => {
const [transactions, setTransactions] = useState([]);
const [user, setUser] = useState(null);
const fetchProfile = async () => {
try {
const res = await API.get("/user/profile");
setUser(res.data);
} catch (err) {
console.log(err);
}
};
const fetchTransactions = async () => {
try {
const res = await API.get("/user/transactions");
setTransactions(res.data);
} catch (err) {
console.log(err);
}
};
useEffect(() => {
const loadData = async () => {
await fetchProfile();
await fetchTransactions();
};
loadData();
}, []);
const columns = [
{
title: "Type",
render: (_, record) => {
return record.sender?._id === user?._id ? (
<Tag color="red">Sent</Tag>
) : (
<Tag color="green">Received</Tag>
);
},
},
{
title: "Person",
render: (_, record) => {
return record.sender?._id === user?._id
? record.receiver?.fullName
: record.sender?.fullName;
},
},
{
title: "Amount",
dataIndex: "amount",
},
{
title: "Status",
render: (_, record) => {
return record.sender?._id === user?._id ? (
<Tag color="red">Debited</Tag>
) : (
<Tag color="green">Credited</Tag>
);
},
},
{
title: "Date",
render: (_, record) => {
return new Date(record.createdAt).toLocaleString();
},
},
];
return (
<UserLayout>
<Card title="Transaction History">
<Table columns={columns} dataSource={transactions} rowKey="_id" />
</Card>
</UserLayout>
);
};
export default UserTransactions;
