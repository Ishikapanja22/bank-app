import { Layout, Menu } from "antd";
import {DashboardOutlined,UserOutlined,MoneyCollectOutlined,TransactionOutlined,} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
const { Sider, Content } = Layout;
const AdminLayout = ({ children }) => {
const navigate = useNavigate();
const location = useLocation();
return (
<Layout style={{ minHeight: "100vh" }}>
<Sider
width={220}
style={{
background: "#001529",
}}
>
<div className="text-white text-3xl font-bold text-center py-6">
NeoFi Bank Admin
</div>
<Menu
theme="dark"
mode="inline"
selectedKeys={[location.pathname]}
onClick={({ key }) => navigate(key)}
items={[
{
key: "/admin/dashboard",
icon: <DashboardOutlined />,
label: "Dashboard",
},
{
key: "/admin/users",
icon: <UserOutlined />,
label: "Users",
},
{
key: "/admin/loans",
icon: <MoneyCollectOutlined />,
label: "Loans",
},
{
key: "/admin/transactions",
icon: <TransactionOutlined />,
label: "Transactions",
},
]}
/>
</Sider>
<Layout>
<Content
style={{
padding: "20px",
background: "#f5f5f5",
}}
>
{children}
</Content>
</Layout>
</Layout>
);
};
export default AdminLayout;
