import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddBookPage() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [about, setAbout] = useState('');
    const [genre, setGenre] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            alert("You need to be logged in as a librarian/admin to add books.");
            navigate('/login');
            return;
        }

        fetch('http://localhost:8080/book/add_book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({ title, author, about, genre }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Adding book failed: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                alert(`Book "${data.title}" added successfully!`);
                navigate('/'); // Go back to the main page or an admin dashboard
            })
            .catch(error => {
                alert(error.message);
            });
    };

    return (
        <div className="add-book-page">
            <h2>Add New Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="author">Author:</label>
                    <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="about">About:</label>
                    <textarea id="about" value={about} onChange={(e) => setAbout(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="genre">Genre:</label>
                    <input type="text" id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
                </div>
                <button type="submit">Add Book</button>
            </form>
            <Link to="/">Cancel</Link>
        </div>
    );
}

export default AddBookPage;