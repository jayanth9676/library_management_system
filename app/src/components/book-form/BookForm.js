import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
    Paper,
    Container,
    Button,
    TextField,
    FormGroup,
    FormControl,
    Typography,
} from "@mui/material"
import BookService from '../../services/BookService';
import classes from "./styles.module.css"

const BookForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState('');
    const [error, setError] = useState('');

    // const [title, setTitle] = useState('');
    // const [isbn, setIsbn] = useState('');
    // const [authorId, setAuthorId] = useState('');

    // const addBookForm = (event) => {
    //     event.preventDefault();
    //     console.log('addBookForm')
    //     const book = { title, isbn, authorId: parseInt(authorId) };
    //     BookService.addBook(book).then(() => {
    //     setTitle('');
    //     setIsbn('');
    //     setAuthorId('');
    //     });
    // };

    // const [errors, setErrors] = useState({
    //     title: "",
    //     isbn: "",
    //     authorId: "",
    // })

    // const isInvalid = book.title.trim() === "" || book.isbn.trim() === "" || book.authorId === 0


	const updateBookForm = (event) => {
		event.preventDefault();
		BookService.updateBook(book.id, book)
		  .then(() => {
            setBook('');
            navigate(-1);
		  })
		  .catch((error) => {
		    setError('Error updating book.');
		  });
	};

    const addBookForm = (event) => {
        event.preventDefault();
        BookService.addBook(book).then(() => {
            setBook('');
            navigate(-1);
        }).catch((error) => {
            setError('Error adding book.');
        });
    };

    const updateBookField = (event) => {
        const field = event.target;
        setBook((book) => ({ ...book, [field.name]: field.value }))
    }

    const validateForm = (event) => {
        // const { name, value } = event.target
        // if (["title", "isbn", "authorId"].includes(name)) {
        //     setBook((prevProd) => ({ ...prevProd, [name]: value.trim() }))
        //     if (!value.trim().length) {
        //         setErrors({ ...errors, [name]: `${name} can't be empty` })
        //     } else {
        //         setErrors({ ...errors, [name]: "" })
        //     }
        // }
    }

    

    useEffect(() => {
        console.log(id);
        const fetchBook = async (id) => {
            if (id) {
                console.log(id);
                await BookService.getBookById(id).then((response) => {
                    setBook(response.data);
                }).catch((error) => {
                    setError('Error retrieving book details.');
                });
            }
        }
        fetchBook(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    // useEffect(() => {
    //     BookService.getBookById(id)
    //       .then((response) => {
    //         setBook(response.data);
    //       })
    //       .catch((error) => {
    //         setError('Error retrieving book details.');
    //       });
    //   }, [id]);

    return (
        <>
            <Container component={Paper} className={classes.wrapper}>
                <Typography className={classes.pageHeader} variant="h5">
                    {id ? "Update Book" : "Add Book"}
                </Typography>   
                <form noValidate autoComplete="off" onSubmit={id ? updateBookForm : addBookForm}>
                    <FormGroup>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label = {id ? "" : "Text"}
                                name="title"
                                type="text"
                                required
                                // value={title}
                                value={book.title}
                                // onChange={(e) => setTitle(e.target.value)}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                // error={errors.title.length > 0}
                                // helperText={errors.name}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label = {id ? "" : "ISBN"}
                                name="isbn"
                                type="text"
                                required
                                // value={isbn}
                                value={book.isbn}
                                // onChange={(e) => setIsbn(e.target.value)}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                // error={errors.isbn.length > 0}
                                // helperText={errors.isbn}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label = {id ? "" : "AuthorId"}
                                name="authorId"
                                type="number"
                                required
                                // value={authorId}
                                value={book.authorId}
                                // onChange={(e) => setAuthorId(e.target.value)}
                                onChange={updateBookField}
                                onBlur={validateForm}
                                // error={errors.authorId.length > 0}
                                // helperText={errors.authorId}
                            />
                        </FormControl>
                    </FormGroup>
                    <div className={classes.btnContainer}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                navigate(-1)
                            }}
                        >
                            Cancel
                        </Button>
                        {/* <Button type="submit" variant="contained" color="primary" disabled={isInvalid}> */}
                        <Button type="submit" variant="contained" color="primary">
                            {id ? "Update Book" : "Add Book"}
                        </Button>
                    </div>
                </form>
            </Container>
        </>
    )
}

export default BookForm;