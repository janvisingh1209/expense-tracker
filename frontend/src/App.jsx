import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import Home from "./pages/dashboard/home";
import Income from "./pages/dashboard/income";
import Expense from "./pages/dashboard/expense";
import UserProvider, { UserContext } from "./context/UserContext";
import ProtectedRoute from "./components/protectedroutes/ProtectedRoutes";
import {Toaster}   from "react-hot-toast"
// 🧠 AppRoutes handles all route-level rendering after loading finishes
const AppRoutes = () => {
  const { user, loading } = useContext(UserContext);

  // ⏳ Wait for token check to finish
  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/income"
        element={
          <ProtectedRoute>
            <Income />
          </ProtectedRoute>
        }
      />
      <Route
        path="/expense"
        element={
          <ProtectedRoute>
            <Expense />
          </ProtectedRoute>
        }
      />

      {/* Optional fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>

  <Toaster
  toastOptions={{
  className:"",
style:{
  fontSize:'13px'
},


  }}
   />

    </UserProvider>
  );
};

export default App;
