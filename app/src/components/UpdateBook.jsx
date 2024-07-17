import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookService from '../services/BookService';

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: '', isbn: '', authorId: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    BookService.getBookById(id)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        setError('Error retrieving book details.');
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    BookService.updateBook(id, book)
      .then(() => {
        navigate('/books');
      })
      .catch((error) => {
        setError('Error updating book.');
      });
  };

  return (
    <div>
      <h1>Update Book</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          required
        />
        <br />
        <label>ISBN:</label>
        <input
          type="text"
          name="isbn"
          value={book.isbn}
          onChange={handleChange}
          required
        />
        <br />
        <label>Author ID:</label>
        <input
          type="text"
          name="authorId"
          value={book.authorId}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default UpdateBook;
