import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Container,
} from "@mui/material"
import { Route, Routes, Navigate, Link } from "react-router-dom"
// import AdbIcon from "@mui/icons-material/Adb"
import BookList from "../books-list/BookList"
import Book from "../book/Book"
import BookForm from "../book-form/BookForm"
import BooksByAuthor from "../book-form/BooksByAuthor"
import AuthorForm from "../author-form/AuthorForm"
import AuthorList from "../authors-list/AuthorList"
// import BooksByAuthor from "../BooksByAuthor"
import BooksByAuthorId from "../books-list/BooksByAuthorId"


export const AppLayout = () => {
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* <AdbIcon sx={{ display: "flex", mr: 1 }} /> */}
                        <Link to="/" style={{ textDecoration: "none", flexGrow: 1 }}>
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    mr: 2,
                                    display: "flex",
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "white",
                                }}
                            >
                                Library Management System
                            </Typography>
                        </Link>
                        <Box
                            sx={{
                                flexGrow: 0,
                            }}
                        >
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Routes>
                <Route path="/books" exact element={<BookList />} />
                <Route
                    path="/books/:id"
                    element={
                        <Book />
                    }
                />
                <Route
                    path="/books/books-by-author"
                    element={
                        <BooksByAuthor />
                    }
                />
                <Route
                    path="/books/books-by-author/:authorId"
                    element={
                        <BooksByAuthorId />
                    }
                />
                <Route
                    path="/books/add-book"
                    element={
			            <BookForm />
                    }
		            exact
                />
                <Route
                    path="/books/update-book/:id"
                    element={
			            <BookForm />
                    }
                />
                <Route path="/authors" exact element={<AuthorList />} />
                <Route
                    path="/authors/add-author"
                    element={
                        <AuthorForm />
                    }
                    exact
                />
                <Route path="*" element={<Navigate to="/books" replace />} />
            </Routes>
        </>
    )
}