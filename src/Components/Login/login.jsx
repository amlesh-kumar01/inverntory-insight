import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import "./login.css";
import AuthContext from "../../Contexts/authContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",  
    password: "",
  });
  const [loading, setLoading] = useState(false); 
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const url = "http://localhost:8000";
      const response = await axios.post(`${url}/user/login`, formData);

      const { token, success } = response.data;  
      if (success) {
        toast.success('Login Successful!');
        setTimeout(() => navigate("/"), 2000);
      }

      Cookies.set("token", token, { expires: 1, secure: true, sameSite: "strict" });
      login(token);

    } catch (error) {
      console.log(error.message);
      toast.error('Invalid User Credentials! Try Again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Toaster />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        <div className="login-form-group">
          <label className="login-label" htmlFor="email">  
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="login-input"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="login-form-group">
          <label className="login-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            className="login-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
        <br />
        <Link to="/" className="login-link">
          Back to Home
        </Link>
      </form>
    </div>
  );
};

export default Login;
