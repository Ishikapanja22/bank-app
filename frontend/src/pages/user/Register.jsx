import { Form, Input, Button, Card, message } from "antd";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
const navigate = useNavigate();
const onFinish = async (values) => {
try {
await API.post("/user/register", values);
message.success("Request Sent To Admin");
navigate("/user/login");
} catch (err) {
console.log(err);
message.error("Registration Failed");
}
};
return (
<div className="h-screen flex justify-center items-center bg-blue-100">
<Card title="Open Bank Account" className="w-96">
<Form layout="vertical" onFinish={onFinish}>
<Form.Item label="Full Name" name="fullName">
<Input />
</Form.Item>
<Form.Item label="Email" name="email">
<Input />
</Form.Item>
<Form.Item label="Password" name="password">
<Input.Password />
</Form.Item>
<Button type="primary" htmlType="submit" block>
Register
</Button>
<div className="text-center mt-4">
<p>
Already Registered?{" "}
<span
className="text-blue-600 cursor-pointer font-semibold"
onClick={() => navigate("/user/login")}
>
Login Here
</span>
</p>
</div>
</Form>
</Card>
</div>
);
};
export default Register;
