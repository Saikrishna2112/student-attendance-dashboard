import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
// import "./login.css";
import "../styles/login.css";


const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/api/auth/login", {
        email,
        password,
      });

      // Pass the entire teacher object from the response, which now includes className
      login(
        {
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          className: res.data.className // ✅ IMPORTANT: Include className
        },
        res.data.token
      );

      window.location.href = "/students"; // Redirect after successful login
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">

      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="login-card">
          <div className="login-icon">🔐</div>

          {/* <h2 className="login-title">Sign in with email</h2>
          <p className="login-subtitle">
            Enter the Email & Password
          </p> */}

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <span className="input-icon">📧</span>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <h1 className="welcome-text">
          LOGIN TO <br />
          ACCESS YOUR <br />
          STUDENT ATTENDANCE DASHBOARD
        </h1>
      </div>
    </div>
  );
};

export default LoginPage;