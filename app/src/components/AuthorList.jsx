import React, { useEffect, useState } from 'react';
import AuthorService from '../services/AuthorService';

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    AuthorService.getAllAuthors().then((response) => {
      setAuthors(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Author List</h1>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>{author.id} - {author.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorList;