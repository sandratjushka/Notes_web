import React, { useState } from 'react';
import '../../styles/Auth.css';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Handle successful login, e.g., redirect to a dashboard page
                window.location.href = '/notes'; // Replace with your actual redirect URL
            } else {
                const data = await response.text();
                alert(data); // Display the error message as a plain text alert
            }
        } catch (error) {
            alert(error.message); // Simplistic error handling
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={handleSubmit}>
                    <h3>Sign In</h3>
                    <div className="form-group">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                    <p className="forgot-password text-right">
                        Not registered <a href="/register">sign up?</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
