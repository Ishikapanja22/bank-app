import {
  Button,
  Card,
  Table,
} from "antd";

import {
  DownloadOutlined,
} from "@ant-design/icons";

import {
  useEffect,
  useState,
} from "react";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

import API from "../../api/axios";

import UserLayout from "../../layouts/UserLayout";

const Statement = () => {

  const [user, setUser] =
    useState({});

  const [transactions,
    setTransactions] =
    useState([]);

  /* FETCH USER PROFILE */

  const fetchProfile =
    async () => {

      try {

        const res =
          await API.get(
            "/user/profile"
          );

        setUser(res.data);

      } catch (err) {

        console.log(err);
      }
    };

  /* FETCH TRANSACTIONS */

  const fetchTransactions =
    async () => {

      try {

        const res =
          await API.get(
            "/user/transactions"
          );

        setTransactions(
          res.data
        );

      } catch (err) {

        console.log(err);
      }
    };

  useEffect(() => {

    const loadData =
      async () => {

        await fetchProfile();

        await fetchTransactions();
      };

    loadData();

  }, []);

  /* DOWNLOAD PDF */

  const downloadPDF = () => {

    const doc = new jsPDF();

    /* TITLE */

    doc.setFontSize(24);

    doc.text(
      "NeoFi Bank Statement",
      20,
      20
    );

    /* USER DETAILS */

    doc.setFontSize(14);

    doc.text(
      `Name: ${user.fullName}`,
      20,
      40
    );

    doc.text(
      `Account Number: ${user.accountNumber}`,
      20,
      50
    );

    doc.text(
      `Current Balance: Rs. ${user.balance}`,
      20,
      60
    );

    doc.text(
      `Loan Amount: Rs. ${user.loanAmount}`,
      20,
      70
    );

    doc.text(
      `Account Status: ${
        user.isActive
          ? "ACTIVE"
          : "DEACTIVE"
      }`,
      20,
      80
    );

    /* TRANSACTION TABLE */

    const tableData =
      transactions.map(
        (txn) => [

          txn.sender?._id ===
          user._id
            ? "Sent"
            : "Received",

          txn.sender?._id ===
          user._id
            ? txn.receiver
                ?.fullName
            : txn.sender
                ?.fullName,

          `Rs. ${txn.amount}`,

          txn.sender?._id ===
          user._id
            ? "Debited"
            : "Credited",

          new Date(
            txn.createdAt
          ).toLocaleString(),
        ]
      );

    autoTable(doc, {

      startY: 100,

      head: [[
        "Type",
        "Person",
        "Amount",
        "Status",
        "Date",
      ]],

      body: tableData,
    });

    /* SAVE PDF */

    doc.save(
      "bank-statement.pdf"
    );
  };

  /* TABLE COLUMNS */

  const columns = [

    {
      title: "Type",

      render: (_, record) => (

        record.sender?._id ===
        user._id ? (

          <span className="text-red-600 font-semibold">
            Sent
          </span>

        ) : (

          <span className="text-green-600 font-semibold">
            Received
          </span>
        )
      ),
    },

    {
      title: "Person",

      render: (_, record) => (

        record.sender?._id ===
        user._id
          ? record.receiver
              ?.fullName
          : record.sender
              ?.fullName
      ),
    },

    {
      title: "Amount",

      render: (_, record) => (

        <span>
          Rs. {record.amount}
        </span>
      ),
    },

    {
      title: "Status",

      render: (_, record) => (

        record.sender?._id ===
        user._id ? (

          <span className="text-red-600 font-semibold">
            Debited
          </span>

        ) : (

          <span className="text-green-600 font-semibold">
            Credited
          </span>
        )
      ),
    },

    {
      title: "Date",

      render: (_, record) => (

        new Date(
          record.createdAt
        ).toLocaleString()
      ),
    },
  ];

  return (

    <UserLayout>

      <Card
        title="Bank Statement"

        extra={

          <Button
            type="primary"

            icon={
              <DownloadOutlined />
            }

            onClick={
              downloadPDF
            }
          >

            Download PDF

          </Button>
        }
      >

        {/* USER DETAILS */}

        <div className="mb-8 bg-gray-100 p-5 rounded-lg shadow">

          <p className="mb-2">
            <strong>Name:</strong>{" "}
            {user.fullName}
          </p>

          <p className="mb-2">
            <strong>Account Number:</strong>{" "}
            {user.accountNumber}
          </p>

          <p className="mb-2">
            <strong>Balance:</strong>{" "}
            Rs. {user.balance}
          </p>

          <p className="mb-2">
            <strong>Loan Amount:</strong>{" "}
            Rs. {user.loanAmount}
          </p>

          <p>
            <strong>Status:</strong>{" "}

            <span
              className={
                user.isActive
                  ? "text-green-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >

              {user.isActive
                ? "ACTIVE"
                : "DEACTIVE"}

            </span>
          </p>

        </div>

        {/* TRANSACTION TABLE */}

        <Table
          columns={columns}
          dataSource={transactions}
          rowKey="_id"
          pagination={{
            pageSize: 5,
          }}
        />

      </Card>

    </UserLayout>
  );
};

export default Statement;