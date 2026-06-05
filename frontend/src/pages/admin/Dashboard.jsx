import { Card, Row, Col } from "antd";

import { useEffect, useState } from "react";

import API from "../../api/axios";

import AdminLayout from "../../layouts/AdminLayout";

const Dashboard = () => {
  const [data, setData] = useState({
    totalUsers: 0,
    totalLoans: 0,
    totalTransactions: 0,
  });

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const res = await API.get("/admin/dashboard");

        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getDashboardData();
  }, []);

  return (
    <AdminLayout>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Active Accounts">
            <h1 className="text-4xl">
              {data.totalUsers}
            </h1>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Loans">
            <h1 className="text-4xl">
              {data.totalLoans}
            </h1>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Transactions">
            <h1 className="text-4xl">
              {data.totalTransactions}
            </h1>
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Dashboard;