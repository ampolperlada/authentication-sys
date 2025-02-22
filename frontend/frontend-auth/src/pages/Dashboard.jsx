import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css"; // ✅ Import CSS

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token"); // ✅ Get token from storage
      if (!token) return navigate("/login"); // ✅ Redirect if not logged in

      try {
        const res = await axios.get("http://localhost:5000/api/auth/dashboard", {  // ✅ Updated API route
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (error) {
        localStorage.removeItem("token"); // ✅ Clear invalid token
        navigate("/login"); // ✅ Redirect to login
      }
    };

    fetchUser();
  }, [navigate]);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect after logout
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h2>Welcome, {user?.email || "Guest"}!</h2>
        <p>You are logged in as <strong>{user?.role || "User"}</strong>.</p>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;


/* 
✅ What’s New in This Update?
✅ Fixed API Route:

Updated the request to GET http://localhost:5000/api/auth/dashboard instead of /api/protected.
✅ Improved Security:

Redirects users without a token back to /login.
Removes an invalid token when authentication fails.
✅ Added Logout Feature:

Clears the token from localStorage when clicking the Logout button.
Redirects back to the login page after logout.

*/