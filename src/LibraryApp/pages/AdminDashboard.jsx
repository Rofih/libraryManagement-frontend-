import React from 'react';

function AdminDashboard() {
    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <p>Welcome, Admin! Here you can manage books and users.</p>
            <ul>
                <li><a href="/admin/add-book">Add New Book</a></li>
                <li><a href="/admin/edit-book">Edit Existing Book</a></li>
                <li><a href="/admin/delete-book">Delete Book</a></li>
                <li><a href="/admin/manage-users">Manage Users</a></li>
                {/* add admin links  */}
            </ul>
        </div>
    );
}

export default AdminDashboard;