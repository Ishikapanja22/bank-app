import {
  Table,
  Button,
  Tag,
  message,
} from "antd";

import {
  useEffect,
  useState,
} from "react";

import API from "../../api/axios";

import AdminLayout from "../../layouts/AdminLayout";

const Loans = () => {
  const [loans, setLoans] = useState([]);

  /* FETCH LOANS */

  const fetchLoans = async () => {
    try {
      const res = await API.get(
        "/admin/loans"
      );

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

  /* APPROVE LOAN */

  const approveLoan = async (
    id
  ) => {
    try {
      await API.put(
        `/admin/loan/approve/${id}`
      );

      message.success(
        "Loan Approved"
      );

      fetchLoans();
    } catch (err) {
      console.log(err);

      message.error(
        "Approval Failed"
      );
    }
  };

  /* REJECT LOAN */

  const rejectLoan = async (
    id
  ) => {
    try {
      await API.put(
        `/admin/loan/reject/${id}`
      );

      message.success(
        "Loan Rejected"
      );

      fetchLoans();
    } catch (err) {
      console.log(err);

      message.error(
        "Reject Failed"
      );
    }
  };

  const columns = [
    {
      title: "User",
      render: (_, record) =>
        record.user?.fullName,
    },

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
            record.status ===
            "approved"
              ? "green"
              : record.status ===
                "rejected"
              ? "red"
              : "orange"
          }
        >
          {record.status.toUpperCase()}
        </Tag>
      ),
    },

    {
      title: "Approve",
      render: (_, record) => (
        <>
          {record.status ===
            "pending" && (
            <Button
              type="primary"
              onClick={() =>
                approveLoan(
                  record._id
                )
              }
            >
              Approve
            </Button>
          )}
        </>
      ),
    },

    {
      title: "Reject",
      render: (_, record) => (
        <>
          {record.status ===
            "pending" && (
            <Button
              danger
              onClick={() =>
                rejectLoan(
                  record._id
                )
              }
            >
              Reject
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <AdminLayout>
      <Table
        columns={columns}
        dataSource={loans}
        rowKey="_id"
      />
    </AdminLayout>
  );
};

export default Loans;