import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // ✅ Import custom CSS

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(
                'https://water-quality-backend-v5h7.onrender.com/api/auth/login',
                { email, password },
                { withCredentials: true }
            );

            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                const user = response.data.user;

                if (!user) throw new Error("User data is missing from the response");

                localStorage.setItem('userId', user._id);
                localStorage.setItem('role', user.role);
                localStorage.setItem('loggedin', JSON.stringify(true));

                if (user.isVerified) {
                    if (user.role === 'Admin') {
                        navigate('/admin/profile');
                    } else {
                        navigate('/operator/realtime');
                    }
                } else {
                    try {
                        const token = localStorage.getItem('token');
                        await axios.post(
                            'https://water-quality-backend-v5h7.onrender.com/api/auth/send-verify-otp',
                            { userId: user._id },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        navigate('/verify');
                    } catch (otpError) {
                        console.error("OTP Sending Error:", otpError.response?.data || otpError.message);
                        setError("Failed to send OTP. Please try again.");
                    }
                }
            }
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                />

                <label htmlFor="password">Password</label>
                <div className="password-toggle">
                    <input
                        type={passwordVisible ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                    />
                    <span className="toggle-icon" onClick={togglePasswordVisibility}>
                        {passwordVisible ? '🙈' : '👁️'}
                    </span>
                </div>

                <button type="submit">Submit</button>
            </form>

            <div className="links">
                <Link to="/forgot">Forgot Password?</Link><br />
                Don’t have an account? <Link to="/register">Sign up</Link>
            </div>
        </div>
    );
};

export default Login;
