import {
  Layout,
  Menu,
  Button,
  Avatar,
} from "antd";

import {
  DashboardOutlined,
  SendOutlined,
  HistoryOutlined,
  MoneyCollectOutlined,
  FilePdfOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

const { Sider, Content, Header } =
  Layout;

const UserLayout = ({
  children,
}) => {

  const navigate = useNavigate();

  const location =
    useLocation();

  const [user, setUser] =
    useState(null);

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

  useEffect(() => {

  const loadProfile =
    async () => {

      await fetchProfile();
    };

  loadProfile();

}, []);

  /* LOGOUT */

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    navigate("/user/login");
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >

      {/* SIDEBAR */}

      <Sider width={220}>

        <div className="text-white text-3xl text-center py-6 font-bold">
          NeoFi Bank
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[
            location.pathname,
          ]}

          onClick={({ key }) =>
            navigate(key)
          }

          items={[

            {
              key:
                "/user/dashboard",

              icon:
                <DashboardOutlined />,

              label: "Dashboard",
            },

            {
              key:
                "/user/transfer",

              icon:
                <SendOutlined />,

              label:
                "Transfer Money",
            },

            {
              key:
                "/user/transactions",

              icon:
                <HistoryOutlined />,

              label:
                "Transactions",
            },

            {
              key:
                "/user/loan-request",

              icon:
                <MoneyCollectOutlined />,

              label:
                "Loan Request",
            },

            {
              key:
                "/user/statement",

              icon:
                <FilePdfOutlined />,

              label:
                "Statement",
            },
          ]}
        />

      </Sider>

      {/* MAIN LAYOUT */}

      <Layout>

        {/* HEADER */}

        <Header className="flex justify-between items-center bg-white shadow-sm">

          <h2 className="text-xl font-bold text-white">
            Welcome Back
          </h2>

          {/* USER INFO */}

          <div className="flex items-center gap-4">

            <div className="flex items-center gap-2">

              <Avatar
                icon={<UserOutlined />}
              />

              <span className="font-semibold text-lg text-white">
  {user?.fullName}
</span>

            </div>

            <Button
              danger
              icon={
                <LogoutOutlined />
              }
              onClick={logout}
            >
              Logout
            </Button>

          </div>

        </Header>

        {/* PAGE CONTENT */}

        <Content className="p-5 bg-gray-100">

          {children}

        </Content>

      </Layout>

    </Layout>
  );
};

export default UserLayout;