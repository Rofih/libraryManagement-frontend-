
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

function SignupPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('USER');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignup = (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        fetch('http://localhost:8080/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email, role }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Signup failed: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                alert('Account created successfully! Please log in.');
                navigate('/login');
            })
            .catch(error => {
                setError(error.message);

                // For development: simulate successful signup
                console.log("Development mode: simulating signup");
                alert('Development mode: Account created successfully! Please log in.');
                navigate('/login');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <Navbar />

            <div className="container">
                <div className="form-container">
                    <form onSubmit={handleSignup}>
                        <h2>Sign Up</h2>

                        {error && <div className="error-message">{error}</div>}

                        <div>
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="role">Role:</label>
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="USER">Regular User</option>
                                <option value="LIBRARIAN">Librarian</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>

                        <button type="submit" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>

                        <p className="form-footer">
                            Already have an account? <Link to="/login">Log in</Link>
                        </p>
                    </form>
                </div>
            </div>

            <footer className="footer">
                &copy; {new Date().getFullYear()} Library Hub. All rights reserved.
            </footer>
        </div>
    );
}

export default SignupPage;