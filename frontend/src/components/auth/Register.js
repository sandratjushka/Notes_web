import React, { useState } from 'react';
import '../../styles/Auth.css'; // Make sure the path is correct

function Register({ onRegister }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const validate = () => {
        const validationErrors = [];
        if (username.length < 4) {
            validationErrors.push("Username must be at least 4 characters long.");
        }
        if (password.length < 6) {
            validationErrors.push("Password must be at least 6 characters long.");
        }
        // Add any additional frontend validations here
        setErrors(validationErrors);
        return validationErrors.length === 0; // No errors means validation passed
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Clear any previous errors
        setErrors([]);

        if (!validate()) {
            // If validation fails, stop here.
            return;
        }

        try {
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                // Call the onRegister prop with the data, which could include user info and tokens
                onRegister({ message: 'Registration successful' });
            } else {
                // Backend validation errors or other issues
                setErrors([data.message || 'Failed to register']);
            }
        } catch (error) {
            // Network errors or other unexpected issues
            setErrors([error.toString()]);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={handleSubmit}>
                    <h3>Sign Up</h3>
                    {errors.length > 0 && (
                        <div className="alert alert-danger">
                            {errors.map((error, index) => (
                                <div key={index}>{error}</div>
                            ))}
                        </div>
                    )}
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
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
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    <p className="forgot-password text-right">
                        Already registered <a href="/login">sign in?</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;
