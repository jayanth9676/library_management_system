import { useEffect, useState } from "react"
import { useParams, Link as RouterLink } from "react-router-dom"
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

const BooksByAuthorId = () => {
    const { authorId } = useParams()
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');
    const [activeBookId, setActiveBookId] = useState("")
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [openModal, setOpenModal] = useState(false)

    const fetchAllBooksByAuthorId = async (authorId) => {
        await BookService.getAllBooksByAuthorId(authorId)
            .then((response) => {
                setBooks(response.data);
                setError('');
            })
            .catch((error) => {
                setError('Error retrieving books for the specified author.');
                setBooks([]);
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
        fetchAllBooksByAuthorId(authorId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authorId])

    return (
        <>
            <div className={`${classes.pageHeader} ${classes.mb2}`}>
                <Typography variant="h5" fontWeight= "bold">Books By This Author</Typography>
                {(
                    <Button variant="contained" color="primary" component={RouterLink} to={`/books/books-by-author`}>
                        Check Books By Author
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

export default BooksByAuthorId;