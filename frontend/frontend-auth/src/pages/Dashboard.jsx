import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

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
    <div className="login-container">
    <div className="login-box">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="login-btn" type="submit">Login</button>
      </form>
    </div>
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