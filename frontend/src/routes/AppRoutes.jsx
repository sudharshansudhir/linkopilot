import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Feedback from "../pages/user/Feedback";

import Dashboard from "../pages/user/Dashboard";
import Links from "../pages/user/Links";
import Trending from "../pages/user/Trending";
import Analytics from "../pages/user/Analytics";
import Profile from "../pages/user/Profile";

import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";

const ProtectedRoute = ({
  children,
}) => {
  const token =
    localStorage.getItem("token");

  return token ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

const AdminProtectedRoute = ({
  children,
}) => {
  const token =
    localStorage.getItem(
      "adminToken"
    );

  return token ? (
    children
  ) : (
    <Navigate to="/admin/login" />
  );
};

function AppRoutes() {
  return (
    <Routes>
      {/* AUTH */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* USER */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/links"
        element={
          <ProtectedRoute>
            <Links />
          </ProtectedRoute>
        }
      />

      <Route
        path="/trending"
        element={
          <ProtectedRoute>
            <Trending />
          </ProtectedRoute>
        }
      />

      <Route
  path="/feedback"
  element={
    <ProtectedRoute>
      <Feedback />
    </ProtectedRoute>
  }
/>

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ADMIN */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <Navigate to="/login" />
        }
      />
    </Routes>
  );
}

export default AppRoutes;