import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/api-path";

// Create the context
export const UserContext = createContext();

// Context provider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Prevents flashing incorrect route or premature loading

  // Method to update user data
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Method to clear user data
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  // Restore user from token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axiosInstance
        .get(API_PATHS.AUTH.GET_USER_INFO)
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.error("Token invalid or expired");
          clearUser();

          // ✅ Force redirect to login page on invalid token
          window.location.replace("/login");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser, loading }}>
      {/* Don't render anything until loading is complete */}
      {!loading && children}
    </UserContext.Provider>
  );
};
// we update state after rendering cz react allows it 
//Rendering always happens first — but with a loading flag, you hide the UI until auth check is done.
export default UserProvider;
