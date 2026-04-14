import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Plane } from "lucide-react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated, isLoading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  const fillDemo = () => {
    setEmail("praveen.kumar@kellton.com");
    setPassword("kellton123");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <span className="login-logo__icon">
            <Plane size={32} color="blue" />
          </span>
          <h1 className="login-logo__title">
            Smart Travel <span>Planner</span>
          </h1>
        </div>

        <p className="login-subtitle">Sign in to plan your next adventure</p>

        {error && <div className="login-error">⚠ {error}</div>}

        <div className="login-demo" onClick={fillDemo}>
          <span></span>
          <span>Demo: click to fill credentials</span>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? (
              <span className="login-btn__loading">
                <span className="login-spinner" />
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="login-hint">
          Use <strong>praveen.kumar@kellton.com</strong> or{" "}
          <strong>praveen@kellton.com</strong> with password{" "}
          <strong>kellton123</strong>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
