import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/api-path";

// Hook to protect routes like /dashboard
const useUserAuth = () => {
  const { user, updateUser, clearUser, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading || user) return; // ✅ Wait for loading to finish, or skip if user already set

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        if (isMounted && response.data) {
          updateUser(response.data.user); // 🔄 Be consistent with context setting
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [user, loading, updateUser, clearUser, navigate]);
};

export default useUserAuth;
