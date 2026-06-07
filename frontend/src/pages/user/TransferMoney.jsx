  import { Form, Input, Button, Card, message } from "antd";
  import API from "../../api/axios";
  import UserLayout from "../../layouts/UserLayout";
  const TransferMoney = () => {
  const onFinish = async (values) => {
  try {
  await API.post("/user/transfer", values);
  message.success("Money Transferred Successfully");
  } catch (err) {
  console.log(err);
  message.error(err.response?.data?.message || "Transfer Failed");
  }
  };
  return (
  <UserLayout>
  <Card title="Transfer Money" className="max-w-xl mx-auto">
  <Form layout="vertical" onFinish={onFinish}>
  <Form.Item
  label="Receiver Account Number"
  name="receiverAccountNumber"
  rules={[
  {
  required: true,
  message: "Enter account number",
  },
  ]}
  >
  <Input />
  </Form.Item>
  <Form.Item
  label="Amount"
  name="amount"
  rules={[
  {
  required: true,
  message: "Enter amount",
  },
  ]}
  >
  <Input type="number" />
  </Form.Item>
  <Button type="primary" htmlType="submit" block>
  Send Money
  </Button>
  </Form>
  </Card>
  </UserLayout>
  );
  };
  export default TransferMoney;
