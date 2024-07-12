package com.example.library_management_system.controller;

import com.example.library_management_system.entity.Author;
import com.example.library_management_system.entity.Book;
import com.example.library_management_system.service.BookService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(BookController.class)
public class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookService bookService;

    @Test
    public void shouldCreateBook() throws Exception {
        Author author = new Author();
        author.setId(1L);
        author.setName("J.K. Rowling");

        Book book = new Book();
        book.setTitle("Harry Potter and the Philosopher's Stone");
        book.setIsbn("9780747532743");
        book.setAuthorId(author.getId());

        Mockito.when(bookService.addBook(any(Book.class))).thenReturn(book);

        mockMvc.perform(post("/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\": \"Harry Potter and the Philosopher's Stone\", \"isbn\": \"9780747532743\", \"author\": {\"id\": 1}}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Harry Potter and the Philosopher's Stone"))
                .andExpect(jsonPath("$.isbn").value("9780747532743"));
    }

    @Test
    public void shouldGetAllBooks() throws Exception {
        List<Book> books = getBooks();

        Mockito.when(bookService.getAllBooks()).thenReturn(books);

        mockMvc.perform(get("/books"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Harry Potter and the Philosopher's Stone"))
                .andExpect(jsonPath("$[1].title").value("Harry Potter and the Chamber of Secrets"));
    }

    private static List<Book> getBooks() {
        Author author = new Author();
        author.setId(1L);
        author.setName("J.K. Rowling");

        Book book1 = new Book();
        book1.setTitle("Harry Potter and the Philosopher's Stone");
        book1.setIsbn("9780747532743");
        book1.setAuthorId(author.getId());

        Book book2 = new Book();
        book2.setTitle("Harry Potter and the Chamber of Secrets");
        book2.setIsbn("9780747538493");
        book2.setAuthorId(author.getId());

        List<Book> books = Arrays.asList(book1, book2);
        return books;
    }

    @Test
    public void shouldGetBooksByAuthorId() throws Exception {
        Author author = new Author();
        author.setId(1L);
        author.setName("J.K. Rowling");

        Book book = new Book();
        book.setTitle("Harry Potter and the Philosopher's Stone");
        book.setIsbn("9780747532743");
        book.setAuthorId(author.getId());

        List<Book> books = Arrays.asList(book);

        Mockito.when(bookService.getBooksByAuthorId(1L)).thenReturn(books);

        mockMvc.perform(get("/books/author/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Harry Potter and the Philosopher's Stone"))
                .andExpect(jsonPath("$[0].isbn").value("9780747532743"));
    }

    @Test
    public void shouldUpdateBook() throws Exception {
        Author author = new Author();
        author.setId(1L);
        author.setName("J.K. Rowling");

        Book updatedBook = new Book();
        updatedBook.setTitle("Harry Potter and the Philosopher's Stone - Updated");
        updatedBook.setIsbn("9780747532743");
        updatedBook.setAuthorId(author.getId());

        Mockito.when(bookService.updateBook(any(Long.class), any(Book.class))).thenReturn(updatedBook);

        mockMvc.perform(put("/books/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\": \"Harry Potter and the Philosopher's Stone - Updated\", \"isbn\": \"9780747532743\", \"author\": {\"id\": 1}}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Harry Potter and the Philosopher's Stone - Updated"))
                .andExpect(jsonPath("$.isbn").value("9780747532743"));
    }

    @Test
    public void shouldDeleteBook() throws Exception {
        Mockito.doNothing().when(bookService).deleteBook(1L);

        mockMvc.perform(delete("/books/1"))
                .andExpect(status().isNoContent());
    }
}
