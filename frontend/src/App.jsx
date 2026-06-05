import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
/* ================= ADMIN ================= */

import AdminLogin from "./pages/admin/AdminLogin";

import Dashboard from "./pages/admin/Dashboard";

import Users from "./pages/admin/Users";

import Loans from "./pages/admin/Loans";

import Transactions from "./pages/admin/Transactions";

import PrivateRoute from "./routes/PrivateRoute";

/* ================= USER ================= */

import Register from "./pages/user/Register";

import Login from "./pages/user/Login";

import PendingApproval from "./pages/user/PendingApproval";

import UserDashboard from "./pages/user/UserDashboard";

import TransferMoney from "./pages/user/TransferMoney";

import LoanRequest from "./pages/user/LoanRequest";

import UserTransactions from "./pages/user/UserTransactions";

import Statement from "./pages/user/Statement";

import UserRoute from "./routes/UserRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* ================= DEFAULT REDIRECT ================= */}

        <Route
          path="/"
          element={<Navigate to="/user/login" />}
        />

        {/* ================= ADMIN ROUTES ================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/loans"
          element={
            <PrivateRoute>
              <Loans />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/transactions"
          element={
            <PrivateRoute>
              <Transactions />
            </PrivateRoute>
          }
        />

        {/* ================= USER ROUTES ================= */}

        <Route
          path="/user/register"
          element={<Register />}
        />

        <Route
          path="/user/login"
          element={<Login />}
        />

        <Route
          path="/user/pending-approval"
          element={<PendingApproval />}
        />

        <Route
          path="/user/dashboard"
          element={
            <UserRoute>
              <UserDashboard />
            </UserRoute>
          }
        />

        <Route
          path="/user/transfer"
          element={
            <UserRoute>
              <TransferMoney />
            </UserRoute>
          }
        />

        <Route
          path="/user/loan-request"
          element={
            <UserRoute>
              <LoanRequest />
            </UserRoute>
          }
        />

        <Route
          path="/user/transactions"
          element={
            <UserRoute>
              <UserTransactions />
            </UserRoute>
          }
        />

        <Route
          path="/user/statement"
          element={
            <UserRoute>
              <Statement />
            </UserRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;