import React, { useState } from 'react';
import BookService from '../services/BookService';
import { useNavigate } from "react-router-dom"

const BooksByAuthor = () => {
  const [authorId, setAuthorId] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    BookService.getAllBooksByAuthorId(authorId)
      .then((response) => {
        setBooks(response.data);
        setError('');
      })
      .catch((error) => {
        setError('Error retrieving books for the specified author.');
        setBooks([]);
      });
  };

  return (
    <div>
      <h1>Books by Author</h1>
      <form onSubmit={handleSubmit}>
        <label>Author ID:</label>
        <input
          type="text"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
        />
        <button type="submit">Get Books</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} - {book.isbn}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksByAuthor;
