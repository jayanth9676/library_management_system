package com.example.library_management_system.controller;

import com.example.library_management_system.entity.Author;
import com.example.library_management_system.service.AuthorService;
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

@WebMvcTest(AuthorController.class)
public class AuthorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthorService authorService;

    @Test
    public void shouldCreateAuthor() throws Exception {
        Author author = new Author();
        author.setName("J.K. Rowling");
        author.setBiography("Author of Harry Potter series");

        Mockito.when(authorService.addAuthor(any(Author.class))).thenReturn(author);

        mockMvc.perform(post("/authors")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\": \"J.K. Rowling\", \"biography\": \"Author of Harry Potter series\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("J.K. Rowling"))
                .andExpect(jsonPath("$.biography").value("Author of Harry Potter series"));
    }

    @Test
    public void shouldGetAllAuthors() throws Exception {
        Author author1 = new Author();
        author1.setName("J.K. Rowling");

        Author author2 = new Author();
        author2.setName("J.R.R. Tolkien");

        List<Author> authors = Arrays.asList(author1, author2);

        Mockito.when(authorService.getAllAuthors()).thenReturn(authors);

        mockMvc.perform(get("/authors"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("J.K. Rowling"))
                .andExpect(jsonPath("$[1].name").value("J.R.R. Tolkien"));
    }
}
