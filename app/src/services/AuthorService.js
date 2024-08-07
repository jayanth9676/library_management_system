import axios from 'axios';

const baseURL = 'https://library-management-system-app.onrender.com/api/v1';
//const baseURL = 'http://localhost:8080/api/v1';

const authorsURL = baseURL + '/authors';

const AuthorService = {
  getAllAuthors: () => axios.get(authorsURL),
  addAuthor: (author) => axios.post(authorsURL, author),
};

export default AuthorService;
