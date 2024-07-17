import { useEffect, useState } from "react"
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom"
import {
    Button,
    Card,
    CardContent,
    CardActions,
    Typography,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material"
import BookService from '../../services/BookService';
import { TabPanel } from "../tabs/tab"
import classes from "./styles.module.css"

const Book = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [book, setBook] = useState(null)
    const [openTab, setOpenTab] = useState(0)
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            BookService.getBookById(id)
                .then((response) => {
                    setBook(response.data);
                })
                .catch((error) => {
                    setError('Error retrieving book details.');
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        book && (
            <div className={classes.wrapper}>
                <Typography variant="h5" align="center" style={{ marginBottom: 20 }}>
                    Book Details
                </Typography>
                <Card>
                    <Tabs
                        value={openTab}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={(e, tabIndex) => {
                            setOpenTab(tabIndex)
                        }}
                        centered
                    >
                        <Tab label="Book Details" tabIndex={0} />
                    </Tabs>

                    <TabPanel value={openTab} index={0}>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell variant="head" component="th" width="200">
                                            Title
                                        </TableCell>
                                        <TableCell>{book.title}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" component="th">
                                            ISBN
                                        </TableCell>
                                        <TableCell>{book.isbn}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell variant="head" component="th">
                                            AuthorId
                                        </TableCell>
                                        <TableCell>{book.authorId}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </TabPanel>

                    <CardActions disableSpacing>
                        <div className={classes.btnContainer}>
                            {(
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    component={RouterLink}
                                    to={`/books/update-book/${book.id}`}
                                >
                                    Edit Book
                                </Button>
                            )}
                            <Button type="submit" variant="text" color="primary" onClick={() => navigate(-1)}>
                                Go Back
                            </Button>
                        </div>
                    </CardActions>
                </Card>
            </div>
        )
    )
}

export default Book;