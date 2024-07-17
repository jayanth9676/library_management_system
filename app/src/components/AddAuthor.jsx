import React, { useState } from 'react';
import AuthorService from '../services/AuthorService';

const AddAuthor = () => {
  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const author = { name, biography };
    AuthorService.addAuthor(author).then(() => {
      setName('');
      setBiography('');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Author</h1>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label>Biography:</label>
      <input type="text" value={biography} onChange={(e) => setBiography(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddAuthor;
