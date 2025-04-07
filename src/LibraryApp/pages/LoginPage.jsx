import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Login failed: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem('authToken', data.Token);
                localStorage.setItem('username', data.userName);
                localStorage.setItem('userRole', data.role);

                if (data.role === 'ADMIN') {
                    navigate('/admin');
                } else if (data.role === 'LIBRARIAN') {
                    navigate('/librarian');
                } else {
                    navigate('/');
                }
            })
            .catch(error => {
                alert(error.message);
            });
    };

    return (
        <div className="login-page">
            <h2>Log In</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Log In</button>
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </form>
        </div>
    );
}

export default LoginPage;