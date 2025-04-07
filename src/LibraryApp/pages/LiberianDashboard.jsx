import React from 'react';

function LiberianDashboard() {
    return (
        <div className="librarian-dashboard">
            <h2>Librarian Dashboard</h2>
            <p>Welcome, Librarian! Here you can manage books and borrowing.</p>
            <ul>
                <li><a href="/librarian/add-book">Add New Book</a></li>
                <li><a href="/librarian/edit-book">Edit Existing Book</a></li>
                <li><a href="/librarian/borrow-requests">View Borrow Requests</a></li>
                <li><a href="/librarian/manage-returns">Manage Book Returns</a></li>
                {/*  more librarian links  */}
            </ul>
        </div>
    );
}

export default LibrarianDashboard;