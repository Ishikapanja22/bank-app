import { Form, Input, Button, Card, message } from "antd";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
const navigate = useNavigate();
const onFinish = async (values) => {
try {
const res = await API.post("/user/login", values);
localStorage.setItem("token", res.data.token);
if (!res.data.user.isApproved) {
navigate("/user/pending-approval");
} else {
navigate("/user/dashboard");
}
} catch (err) {
console.log(err);
message.error(err.response?.data?.message || "Login Failed");
}
};
return (
<div className="h-screen flex justify-center items-center bg-blue-100">
<Card title="User Login" className="w-96">
<Form layout="vertical" onFinish={onFinish}>
<Form.Item label="Email" name="email">
<Input />
</Form.Item>
<Form.Item label="Password" name="password">
<Input.Password />
</Form.Item>
<Button type="primary" htmlType="submit" block>
Login
</Button>
<div className="text-center mt-4">
<p>
New User?{" "}
<span
className="text-blue-600 cursor-pointer font-semibold"
onClick={() => navigate("/user/register")}
>
Register Here
</span>
</p>
</div>
</Form>
</Card>
</div>
);
};
export default Login;
