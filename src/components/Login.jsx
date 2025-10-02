import React, { useState } from "react";

const Login = ({ onLogin, onSwitchToRegister }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim() && password.trim()) {
            onLogin();
        } else {
            alert("Please enter both username and password");
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>🔑 Login to Task Management</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">👤 Username or Email:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username or email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">🔒 Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>
                <p className="login-hint">
                    Hint: Enter any username/email and password to login
                </p>
                
                <p className="auth-switch">
                    Don't have an account?{" "}
                    <span className="auth-link" onClick={onSwitchToRegister}>
                        Register here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;