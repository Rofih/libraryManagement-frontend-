import React, { useState, useEffect } from 'react';
import './HomePage.css';
import BookCard from "../components/BookCard.jsx";

function HomePage() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/book/view_books')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setBooks(data);
                setFilteredBooks(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredBooks(books);
            return;
        }

        const filtered = books.filter(book =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredBooks(filtered);
    }, [searchTerm, books]);

    const handleSearch = (e) => {
        e.preventDefault();
    };

    if (loading) {
        return <div>Loading books...</div>;
    }

    if (error) {
        return <div>Error loading books: {error.message}</div>;
    }

    return (
        <div className="library-hub">
            <header className="header">
                <div className="logo">Library Hub</div>
                <nav>
                    <a href="#">Books</a>
                    <a href="#">Login</a>
                </nav>
            </header>

            {/*<main className="main-content">*/}
            {/*    <section className="discover-section">*/}
            {/*        <h1>Discover Books</h1>*/}
            {/*        <p>Browse our collection and find your next great read</p>*/}
            {/*        <div className="search-bar">*/}
            {/*            <form onSubmit={handleSearch}>*/}
            {/*                <input*/}
            {/*                    type="text"*/}
            {/*                    placeholder="Search by title or author..."*/}
            {/*                    value={searchTerm}*/}
            {/*                    onChange={(e) => setSearchTerm(e.target.value)}*/}
            {/*                />*/}
            {/*                <button type="submit">Search</button>*/}
            {/*            </form>*/}
            {/*        </div>*/}
            {/*    </section>*/}

            {/*    <section className="book-grid">*/}
            {/*        {books.map(book => (*/}
            {/*            <BookCard key={book.id} {...book} />*/}
            {/*        ))}*/}
            {/*    </section>*/}
            {/*</main>*/}
            <main className="main-content container">
                <section className="discover-section">
                    <h1>Discover Books</h1>
                    <p>Browse our collection and find your next great read</p>

                    <div className="search-bar">
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="Search by title or author..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="submit">Search</button>
                        </form>
                    </div>
                </section>

                {loading ? (
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                    </div>
                ) : error ? (
                    <div className="error-message">
                        <p>Error loading books: {error.message}</p>
                    </div>
                ) : (
                    <section className="book-grid">
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map(book => (
                                <BookCard key={book.id || book.title} {...book} />
                            ))
                        ) : (
                            <div className="no-books">
                                <p>No books found. Try a different search.</p>
                            </div>
                        )}
                    </section>
                )}
            </main>

            <footer className="footer">
                © 2025 Library Hub. All rights reserved.
            </footer>
        </div>
    );
}


export default HomePage;