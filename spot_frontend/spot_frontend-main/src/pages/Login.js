import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');  // To handle errors
    const [loading, setLoading] = useState(false); // Loading state for UI
    const navigate = useNavigate();  // Hook to navigate after successful login

    // Submit function
    const submit = async (e) => {
        e.preventDefault();
        const user = { username, password };

        setLoading(true);  // Start loading state

        try {
            // Send POST request to get tokens
            const { data } = await axios.post(
                'http://localhost:8000/token/',
                user,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            // Clear previous tokens and store the new ones
            localStorage.clear();
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);

            // Set Authorization header globally for axios
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;

            // Navigate to the home page
            navigate('/home');
        } catch (err) {
            setError(err?.response?.data?.detail || "Invalid username or password");
        } finally {
            setLoading(false);  // End loading state
        }
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={submit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message */}
                    
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input
                            className="form-control mt-1"
                            placeholder="Enter Username"
                            name="username"
                            type="text"
                            value={username}
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="d-grid gap-2 mt-3">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? "Logging in..." : "Submit"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
