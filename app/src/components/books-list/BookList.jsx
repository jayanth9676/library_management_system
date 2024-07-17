import { useState, useEffect } from "react"
import { Link as RouterLink } from "react-router-dom"
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Modal,
    Card,
    CardContent,
    CardActions,
    Typography,
    TablePagination,
} from "@mui/material"
import BookService from '../../services/BookService'
import classes from "./styles.module.css"

const BookList = () => {

    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [activeBookId, setActiveBookId] = useState("")
    const [openModal, setOpenModal] = useState(false)


    const fetchBooks = async () => {
        await BookService.getAllBooks()
            .then((response) => {
                setBooks(response.data);
            })
            .catch((error) => {
                setError('Error retrieving books.');
            });
    }

    const handleDelete = () => {
        if (activeBookId && books.length) {
            BookService.deleteBook(activeBookId).then(() => {
		        setBooks(books.filter((book) => book.id !== activeBookId));
                // fetchBooks()
                setOpenModal(false)
                setActiveBookId("")
            })
            .catch((error) => {
                setError('Error deleting book.');
            });
        }
    }
    

    useEffect(() => {
        fetchBooks()
    }, [])

    return (
        <>
            <div className={`${classes.pageHeader} ${classes.mb2}`}>
                <Typography variant="h5" fontWeight= "bold">Book List</Typography>
                {(
                    <Button variant="contained" color="primary" component={RouterLink} to="/books/add-book">
                        Add Book
                    </Button>
                )}
                {(
                    <Button variant="contained" color="primary" component={RouterLink} to={`/books/books-by-author`}>
                        Books By Author
                    </Button>
                )}
                {(
                    <Button variant="contained" color="primary" component={RouterLink} to="/authors">
                        Author List
                    </Button>
                )}
                {(
                    <Button variant="contained" color="primary" component={RouterLink} to="/authors/add-author">
                        Add Author
                    </Button>
                )}
            </div>
            {books.length > 0 ? (
                <>
                    <div className={classes.tableContainer}>
                        <TableContainer component={Paper}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell align="right">ISBN</TableCell>
                                        <TableCell>AuthorID</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : books
                                    ).map((book) => (
                                        <TableRow key={book.id}>
                                            <TableCell component="th" scope="row">
                                                {book.title}
                                            </TableCell>
                                            <TableCell align="right">{book.isbn}</TableCell>
                                            <TableCell>{book.authorId}</TableCell>
                                            <TableCell>
                                                <div className={classes.actionsContainer}>
                                                    <Button
                                                            variant="contained"
                                                            component={RouterLink}
                                                            size="small"
                                                            to={`/books/books-by-author/${book.authorId}`}
                                                        >
                                                        Books By This Author
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        component={RouterLink}
                                                        size="small"
                                                        to={`/books/${book.id}`}
                                                    >
                                                        View
                                                    </Button>
                                                    {(
                                                        <>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                component={RouterLink}
                                                                size="small"
                                                                to={`/books/update-book/${book.id}`}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                color="secondary"
                                                                size="small"
                                                                onClick={(e) => {
                                                                    setActiveBookId(book.id)
                                                                    setOpenModal(true)
                                                                }}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            onRowsPerPageChange={(e) => {
                                setRowsPerPage(parseInt(e.target.value, 10))
                                setPage(0)
                            }}
                            component="div"
                            count={books.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(e, newPage) => setPage(newPage)}
                        />
                        <Modal open={openModal} onClose={(e) => setOpenModal(false)}>
                            <Card className={classes.conf_modal}>
                                <CardContent>
                                    <h2>Are you sure?</h2>
                                </CardContent>
                                <CardActions className={classes.conf_modal_actions}>
                                    <Button variant="contained" onClick={() => setOpenModal(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={handleDelete}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Modal>
                    </div>
                </>
            ) : (
                <Typography variant="h5">No books found!</Typography>
            )}
        </>
    )
}




// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import BookService from '../services/BookService';

// const BookList = () => {
//   const [books, setBooks] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     BookService.getAllBooks()
//       .then((response) => {
//         setBooks(response.data);
//       })
//       .catch((error) => {
//         setError('Error retrieving books.');
//       });
//   }, []);

//   const handleDelete = (id) => {
//     BookService.deleteBook(id)
//       .then(() => {
//         setBooks(books.filter((book) => book.id !== id));
//       })
//       .catch((error) => {
//         setError('Error deleting book.');
//       });
//   };

//   return (
//     <div>
//       <h1>Book List</h1>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {books.length === 0 ? <h3 style={{ color: 'red', padding:25}}>No books</h3> :
//       <ul>
//         {books.map((book) => (
//           <li key={book.id}>
//             {book.id} - {book.title} - {book.isbn}
//             <button><Link to={`/update-book/${book.id}`}>Edit</Link></button>
//             <button onClick={() => handleDelete(book.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>}
//     </div>
//   );
// };

export default BookList;