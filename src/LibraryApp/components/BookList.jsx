import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from './bookSlice';

function BookList() {
    const dispatch = useDispatch();
    const { bookList, loading, error } = useSelector((state) => state.books);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    if (loading) {
        return <p>Loading book data...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <ul>
            {bookList.map((book) => (
                <li key={book.id}>{book.title}</li>
            ))}
        </ul>
    );
}

export default BookList;