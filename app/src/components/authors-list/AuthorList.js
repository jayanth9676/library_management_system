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
    Typography,
    TablePagination,
} from "@mui/material"
import AuthorService from '../../services/AuthorService'
import classes from "./styles.module.css"

const AuthorList = () => {

    const [authors, setAuthors] = useState([]);
    const [error, setError] = useState('');
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)


    const fetchAuthors = async () => {
        await AuthorService.getAllAuthors()
            .then((response) => {
                setAuthors(response.data);
            })
            .catch((error) => {
                setError('Error retrieving authors.');
            });
    }

    useEffect(() => {
        fetchAuthors()
    }, [])

    return (
        <>
            <div className={`${classes.pageHeader} ${classes.mb2}`}>
                <Typography variant="h5" fontWeight= "bold">Author List</Typography>
                {(
                    <Button variant="contained" color="primary" component={RouterLink} to="/authors/add-author">
                        Add Author
                    </Button>
                )}
            </div>
            {authors.length > 0 ? (
                <>
                    <div className={classes.tableContainer}>
                        <TableContainer component={Paper}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Biography</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? authors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : authors
                                    ).map((author) => (
                                        <TableRow key={author.id}>
                                            <TableCell component="th" scope="row">
                                                {author.name}
                                            </TableCell>
                                            <TableCell align="right">{author.biography}</TableCell>
                                            <TableCell>
                                                <div className={classes.actionsContainer}>
                                                    <Button
                                                            variant="contained"
                                                            component={RouterLink}
                                                            size="small"
                                                            to={`/books/books-by-author/${author.id}`}
                                                        >
                                                        Books By This Author
                                                    </Button>
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
                            count={authors.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(e, newPage) => setPage(newPage)}
                        />
                    </div>
                </>
            ) : (
                <Typography variant="h5">No authors found!</Typography>
            )}
        </>
    )
}

export default AuthorList;