import { Table, Button, Tag, message } from "antd";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";
const Users = () => {
const [users, setUsers] = useState([]);
const fetchUsers = async () => {
try {
const res = await API.get("/admin/users");
setUsers(res.data);
} catch (err) {
console.log(err);
}
};
useEffect(() => {
const loadUsers = async () => {
await fetchUsers();
};
loadUsers();
}, []);
const approveUser = async (id) => {
try {
await API.put(`/admin/user/approve/${id}`);
message.success("User Approved");
fetchUsers();
} catch (err) {
console.log(err);
message.error("Approval Failed");
}
};
const deactivateUser = async (id) => {
try {
await API.put(`/admin/user/deactivate/${id}`);
message.success("User Deactivated");
fetchUsers();
} catch (err) {
console.log(err);
message.error("Deactivate Failed");
}
};
const columns = [
{
title: "Name",
dataIndex: "fullName",
},
{
title: "Email",
dataIndex: "email",
},
{
title: "Account No",
dataIndex: "accountNumber",
},
{
title: "Status",
render: (_, record) => (
<Tag color={record.isActive ? "green" : "red"}>
{record.isActive ? "ACTIVE" : "DEACTIVE"}
</Tag>
),
},
{
title: "Approval",
render: (_, record) => (
<>
{!record.isApproved && (
<Button type="primary" onClick={() => approveUser(record._id)}>
Approve
</Button>
)}
</>
),
},
{
title: "Deactivate",
render: (_, record) => (
<>
{record.isActive && (
<Button danger onClick={() => deactivateUser(record._id)}>
Deactivate
</Button>
)}
</>
),
},
];
return (
<AdminLayout>
<Table columns={columns} dataSource={users} rowKey="_id" />
</AdminLayout>
);
};
export default Users;
