// src/components/ProtectedRoute.jsx

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <div>Loading...</div>; // 🔄 Wait until auth check finishes

  if (!user) return <Navigate to="/login" replace />; // ❌ Not authenticated

  return children; // ✅ Authenticated
};

export default ProtectedRoute;
