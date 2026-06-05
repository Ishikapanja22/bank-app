import { Button, Card } from "antd";

import { useNavigate } from "react-router-dom";

import bank from "../assets/bank.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage: `url(${bank})`,
      }}
    >
      {/* DARK OVERLAY */}

      <div className="absolute inset-0 bg-black/50"></div>

      {/* CONTENT */}

      <div className="relative z-10">
        <Card className="w-[700px] shadow-2xl rounded-2xl">
          
          <h1 className="text-5xl font-bold text-center text-blue-700 mb-4">
            NeoFi BANK
          </h1>

          <p className="text-center text-gray-600 text-lg mb-10 px-10">
            Welcome to NeoFi Bank — your trusted
            digital banking partner for secure
            transactions, smart transfers, and
            modern banking solutions.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            
            <Button
              type="primary"
              size="large"
              className="w-44 h-12 text-lg font-semibold"
              onClick={() =>
                navigate("/user/login")
              }
            >
              User Login
            </Button>

            <Button
              size="large"
              className="w-44 h-12 text-lg font-semibold"
              onClick={() =>
                navigate("/user/register")
              }
            >
              Open Account
            </Button>

            <Button
              danger
              size="large"
              className="w-44 h-12 text-lg font-semibold"
              onClick={() =>
                navigate("/admin/login")
              }
            >
              Admin Login
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;