import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from "@mui/material"
import { NotificationContainer } from "react-notifications"
import { AppLayout } from "./components/layout/app-layout"

// import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
// import BookList from './components/BookList';
// import AuthorList from './components/AuthorList';
// import AddBook from './components/AddBook';
// import AddAuthor from './components/AddAuthor';
// import UpdateBook from './components/UpdateBook';
// import BooksByAuthor from './components/BooksByAuthor';

const App = () => {
  return (
    <Suspense fallback={null}>
      <Container className="page-container">
        <Router>
          <AppLayout />
          <NotificationContainer />
        </Router>
      </Container>
    </Suspense>

    // <Router>
    //   <div>
    //     <nav>
    //       <ul>
    //         <li><Link to="/books">Books</Link></li>
    //         <li><Link to="/authors">Authors</Link></li>
    //         <li><Link to="/add-book">Add Book</Link></li>
    //         <li><Link to="/add-author">Add Author</Link></li>
    //         <li><Link to="/books-by-author">Books by Author</Link></li>
    //       </ul>
    //     </nav>

    //     <Routes>
    //       <Route path="/books" exact element={<BookList />} />
    //       <Route path="/authors" exact element={<AuthorList />} />
    //       <Route path="/add-book" element={<AddBook />} />
    //       <Route path="/add-author" element={<AddAuthor />} />
    //       <Route path="/update-book/:id" element={<UpdateBook />} />
    //       <Route path="/books-by-author" element={<BooksByAuthor />} />
    //     </Routes>
    //   </div>
    // </Router>
  );
};

export default App;
