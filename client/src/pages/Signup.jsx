import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Signup.css'; // ✅ Add this line

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const response = await axios.post("http://localhost:5000/api/auth/register", {
  name, email, password
});


      if (response.data.success) {
        alert("Registration successful. Redirecting to login.");
        navigate("/login");
      } else {
        alert(response.data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      alert(
        err.response?.data?.message ||
        "Registration failed. Please check your details and try again."
      );
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;
