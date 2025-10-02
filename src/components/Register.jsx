import React, { useState } from "react";
import { registerUser } from './api.js';

const Register = ({ onRegister, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        email: "",
        fullname: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };
    
    const validateForm = () => {
        const newErrors = {};
       // newErrors.vish = "hello";
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Fullname validation
        if (!formData.fullname) {
            newErrors.fullname = "Full name is required";
        } else if (formData.fullname.length < 2) {
            newErrors.fullname = "Full name must be at least 2 characters";
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);
        setApiError("");

        try {
            const result = await registerUser({
                email: formData.email,
                fullName: formData.fullname,
                password: formData.password
            });

            if (result.success) {
                alert(`Account created successfully for ${formData.email}!`);
                onRegister();
            } else {
                setApiError(result.error || "Registration failed. Please try again.");
            }
        } catch (error) {
            setApiError("Network error. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form register-form">
                <h2> Create Account</h2>
                <form onSubmit={handleSubmit}>
                    {apiError && (
                        <div className="error-message" style={{
                            color: '#ff4444',
                            backgroundColor: '#ffebee',
                            padding: '10px',
                            borderRadius: '4px',
                            marginBottom: '15px',
                            border: '1px solid #ffcdd2'
                        }}>
                            {apiError}
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="email">📧 Email Address:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                            className={errors.email ? "error" : ""}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullname">👤 Full Name:</label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className={errors.fullname ? "error" : ""}
                        />
                        {errors.fullname && <span className="error-text">{errors.fullname}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">🔒 Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            className={errors.password ? "error" : ""}
                        />
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">🔐 Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className={errors.confirmPassword ? "error" : ""}
                        />
                        {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                    </div>
                    <button type="submit" className="login-btn" disabled={isLoading}>
                        {isLoading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>
                <p className="auth-switch">
                    Already have an account?{" "}
                    <span className="auth-link" onClick={onSwitchToLogin}>
                        Login here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;