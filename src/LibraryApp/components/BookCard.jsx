
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BookCard.css'



function BookCard({ id, title, author, about, status, genre }) {
    return (
        <div className="book-card">
            <h3 className="book-title">{title}</h3>
            <p className="book-author">by {author}</p>
            <p className="book-description">{about.substring(0, 80)}...</p>
            <p className="book-genre">{genre}</p>
            <div className="book-actions">
                <span className={`book-status ${status.toLowerCase()}`}>{status}</span>
                {status === 'AVAILABLE' ? (
                    <Link to={`/borrow/${id}`}>Borrow</Link>
                ) : (
                    <button className="view-button">View Details</button>
                )}
                <button className="details-button">More Info</button>
            </div>
        </div>
    );
}
export default BookCard;