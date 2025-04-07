import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const userRole = localStorage.getItem('userRole');

    return (
        <header className="header">
            <div className="logo">Rofih Library</div>
            <nav>
                <Link to="/">Books</Link>
                <Link to="/login">Login</Link>
                {userRole === 'LIBERIAN' || userRole === 'ADMIN' ? (
                    <>
                        <Link to="/admin/add-book">Add Book</Link>
                        <Link to="/admin/edit-book">Edit Book</Link>
                        <Link to="/admin/delete-book">Delete Book</Link>
                    </>
                ) : null}
            </nav>
        </header>
    );
}

export default Header;