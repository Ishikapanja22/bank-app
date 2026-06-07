import { Form, Input, Button, Card, message } from "antd";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
const navigate = useNavigate();
const onFinish = async (values) => {
try {
const res = await API.post("/admin/login", values);
localStorage.setItem("token", res.data.token);
message.success("Login Success");
navigate("/admin/dashboard");
} catch (error) {
console.log(error);
message.error("Login Failed");
}
};
return (
<div className="h-screen flex justify-center items-center bg-blue-100">
<Card title="Admin Login" className="w-96 shadow-lg">
<Form layout="vertical" onFinish={onFinish}>
<Form.Item label="Username" name="username">
<Input />
</Form.Item>
<Form.Item label="Password" name="password">
<Input.Password />
</Form.Item>
<Button htmlType="submit" type="primary" block>
Login
</Button>
</Form>
</Card>
</div>
);
};
export default AdminLogin;
