import React, { useState } from 'react';
import BookService from '../services/BookService';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [authorId, setAuthorId] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const book = { title, isbn, authorId: parseInt(authorId) };
    BookService.addBook(book).then(() => {
      setTitle('');
      setIsbn('');
      setAuthorId('');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Book</h1>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>ISBN:</label>
      <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
      <label>Author ID:</label>
      <input type="number" value={authorId} onChange={(e) => setAuthorId(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddBook;
