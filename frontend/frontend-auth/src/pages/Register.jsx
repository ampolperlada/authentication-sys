import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css"; // ✅ Ensure this is correct

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      navigate("/login"); // ✅ Redirect to Login after registration
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="register-container">  {/* ✅ Full-width container */}
      <div className="register-box">  
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleRegister}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="register-btn" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

// ✅ Export should be **outside** of the return block.
export default Register;
