import { useEffect, useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { Outlet, useNavigate } from "react-router-dom";

const AdminRoute = () => {
  const navigate = useNavigate();
  const [adminStatus, setAdminStatus] = useState(false);
  // get the jwt token
  const storedJwtToken = localStorage.getItem("jwtToken");

  // useEffect to check if user is admin or not
  useEffect(() => {
    async function verifyAdminStatus() {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${storedJwtToken}`,
          },
        });

        if (!response.ok) {
          navigate("/login");
          throw new Error("Failed to load the route");
        }

        const userData = await response.json();
        console.log(userData);

        //set state and redirect based on if admin or not
        if (userData.isAdmin) {
          setAdminStatus(true);
          return;
        } else {
          navigate("/login");
          setAdminStatus(false);
          return;
        }
      } catch (error) {
        //if unexpected errors are shown then just nagivate to login and set state to false
        setAdminStatus(false);
        navigate("/login");
        console.log(error);
      }
    }

    verifyAdminStatus();
  }, [storedJwtToken, navigate]);

  //render outlet if admin status is true
  return adminStatus && <Outlet />;
};

export { AdminRoute };
