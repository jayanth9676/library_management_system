import React, { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import {
    Paper,
    Container,
    Button,
    TextField,
    FormGroup,
    FormControl,
    Typography,
} from "@mui/material"
import classes from "./styles.module.css"

const BookForm = () => {
    const [authorId, setAuthorId] = useState('');

    const searchBooksByAuthorId = (event) => {
      event.preventDefault();
      <Button
              variant="contained"
              component={RouterLink}
              size="small"
              to={`/books/books-by-author/${authorId}`}
          >
          Books By This Author
      </Button>
    };

    return (
        <>
            <Container component={Paper} className={classes.wrapper}>
                <Typography className={classes.pageHeader} variant="h5">
                  Search Books By Author ID
                </Typography>   
                <form noValidate autoComplete="off" onSubmit={searchBooksByAuthorId}>
                    <FormGroup>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label = "AuthorId"
                                name="authorId"
                                type="number"
                                required
                                value={authorId}
                                onChange={(e) => setAuthorId(e.target.value)}
                            />
                        </FormControl>
                    </FormGroup>
                    <div className={classes.btnContainer}>
                        <Button type="submit" 
                          variant="contained" 
                          color="primary"
                          component={RouterLink}
                          size="small"
                          to={`/books/books-by-author/${authorId}`}
                        >
                            Search Books
                        </Button>
                    </div>
                </form>
            </Container>
        </>
    )
}

export default BookForm;