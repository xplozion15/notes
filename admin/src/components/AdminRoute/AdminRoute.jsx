import { useEffect, useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
  const [adminStatus, setAdminStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  // useEffect to check if user is admin or not
  useEffect(() => {
    // get the jwt token
    const storedJwtToken = localStorage.getItem("jwtToken");
    async function verifyAdminStatus() {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${storedJwtToken}`,
          },
        });

        if (!response.ok) {
          return;
        }

        const userData = await response.json();
        console.log(userData);

        //set state and redirect based on if admin or not
        if (userData.isAdmin) {
          setAdminStatus(true);
          return;
        } else {
          //remove jwt token from localstorage as user isnt an admin 
          localStorage.removeItem("jwtToken");
          setAdminStatus(false);
          return;
        }
      } catch (error) {
        //if unexpected errors are shown then just set state to false
        setAdminStatus(false);
        localStorage.removeItem("jwtToken");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    verifyAdminStatus();
  }, []);

  //render outlet if admin status is true
  if (loading) return <p>Checking if user is admin or not...</p>;
  return !adminStatus ? <Navigate to="/login" /> : <Outlet />;
};

export { AdminRoute };
