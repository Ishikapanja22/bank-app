import { Table } from "antd";

import { useEffect, useState } from "react";

import API from "../../api/axios";

import AdminLayout from "../../layouts/AdminLayout";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const res = await API.get(
          "/admin/transactions"
        );

        setTransactions(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getTransactions();
  }, []);

  const columns = [
    {
      title: "Sender",
      render: (_, record) =>
        record.sender?.fullName,
    },

    {
      title: "Receiver",
      render: (_, record) =>
        record.receiver?.fullName,
    },

    {
      title: "Amount",
      dataIndex: "amount",
    },

    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <AdminLayout>
      <Table
        columns={columns}
        dataSource={transactions}
        rowKey="_id"
      />
    </AdminLayout>
  );
};

export default Transactions;