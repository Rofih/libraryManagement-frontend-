import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function BorrowPage() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/book/view_books`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setBook(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    const handleBorrow = () => {
        const authToken = localStorage.getItem('authToken');
        const username = localStorage.getItem('username');

        if (!authToken) {
            alert("You must be logged in to borrow a book.");
            navigate('/login');
            return;
        }

        fetch('http://localhost:8080/rent_books/borrow_book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                bookName: book.title,
                bookAuthor: book.author,
                userName: username,
                returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                alert(`You have successfully borrowed "${book.title}"!`);
                navigate('/');
            })
            .catch(error => {
                setError(error);
                alert(`Error borrowing book: ${error.message}`);
            });
    };

    if (loading) {
        return <div>Loading book details...</div>;
    }

    if (error) {
        return <div>Error loading book details: {error.message}</div>;
    }

    if (!book) {
        return <div>Book not found.</div>;
    }

    return (
        <div className="borrow-page">
            <h2>Borrow "{book.title}"</h2>
            <p>Are you sure you want to borrow this book?</p>
            <button onClick={handleBorrow}>Confirm Borrow</button>
            <Link to="/">Cancel</Link>
        </div>
    );
}

export default BorrowPage;