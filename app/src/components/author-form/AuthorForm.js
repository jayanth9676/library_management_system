import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Paper,
    Container,
    Button,
    TextField,
    FormGroup,
    FormControl,
    Typography,
} from "@mui/material"
import AuthorService from '../../services/AuthorService';
import classes from "./styles.module.css"

const AuthorForm = () => {
    const navigate = useNavigate();
    const [author, setAuthor] = useState('');
    const [error, setError] = useState('');

    const addAuthorForm = (event) => {
        event.preventDefault();
        console.log(author);
        AuthorService.addAuthor(author).then(() => {
            setAuthor('');
            navigate('/authors');
        }).catch((error) => {
            setError('Error adding author.');
        });
    };

    const updateAuthorField = (event) => {
        const field = event.target;
        setAuthor((author) => ({ ...author, [field.name]: field.value }))
    }

    return (
        <>
            <Container component={Paper} className={classes.wrapper}>
                <Typography className={classes.pageHeader} variant="h5">
                    Add Author
                </Typography>   
                <form noValidate autoComplete="off" onSubmit={addAuthorForm}>
                    <FormGroup>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label = "Name"
                                name="name"
                                type="text"
                                required
                                value={author.name}
                                onChange={updateAuthorField}
                            />
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label = "Biography"
                                name="biography"
                                type="text"
                                required
                                value={author.biography}
                                onChange={updateAuthorField}
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
                        <Button type="submit" variant="contained" color="primary">
                            Add Author
                        </Button>
                    </div>
                </form>
            </Container>
        </>
    )
}

export default AuthorForm;