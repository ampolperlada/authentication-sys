import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token"); // ✅ Get token from storage
      if (!token) return navigate("/login"); // ✅ Redirect if not logged in

      try {
        const res = await axios.get("http://localhost:5000/api/protected", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (error) {
        localStorage.removeItem("token"); // Clear invalid token
        navigate("/login"); // Redirect to login
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;


/* 
This page:

Fetches user data from /api/protected
Redirects to login if no token is found
Shows user email and logout button
*/