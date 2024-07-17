import axios from 'axios';

const baseURL = 'http://localhost:8080/api/v1';

const booksURL = baseURL + '/books';


const BookService = {
  getAllBooks: () => axios.get(booksURL),
  getBookById: (id) => axios.get(`${booksURL}/${id}`),
  addBook: (book) => axios.post(booksURL, book),
  updateBook: (id, book) => axios.put(`${booksURL}/${id}`, book),
  deleteBook: (id) => axios.delete(`${booksURL}/${id}`),
  getAllBooksByAuthorId: (id) => axios.get(`${baseURL}/authors/${id}/books`),
};

export default BookService;
