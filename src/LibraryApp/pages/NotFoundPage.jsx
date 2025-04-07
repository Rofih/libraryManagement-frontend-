
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

function NotFoundPage() {
    return (
        <div>
            <Navbar />

            <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h1 style={{ fontSize: '3rem', color: 'var(--primary-color)' }}>404</h1>
                <h2>Page Not Found</h2>
                <p style={{ marginBottom: '2rem' }}>
                    The page you are looking for does not exist or has been moved.
                </p>
                <Link to="/" className="button-primary">
                    Back to Home
                </Link>
            </div>

            <footer className="footer">
                &copy; {new Date().getFullYear()} Library Hub. All rights reserved.
            </footer>
        </div>
    );
}

export default NotFoundPage;