package com.example.library_management_system.service;

import com.example.library_management_system.entity.Author;
import com.example.library_management_system.repository.AuthorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class AuthorServiceTest {

    @Mock
    private AuthorRepository authorRepository;

    @InjectMocks
    private AuthorService authorService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddAuthor() {
        Author author = new Author();
        author.setName("Author Name");
        when(authorRepository.save(any(Author.class))).thenReturn(author);

        Author createdAuthor = authorService.addAuthor(author);

        assertNotNull(createdAuthor);
        assertEquals("Author Name", createdAuthor.getName());
        verify(authorRepository, times(1)).save(author);
    }

    @Test
    public void testGetAllAuthors() {
        Author author1 = new Author();
        author1.setName("Author One");

        Author author2 = new Author();
        author2.setName("Author Two");

        when(authorRepository.findAll()).thenReturn(Arrays.asList(author1, author2));

        List<Author> authors = authorService.getAllAuthors();

        assertEquals(2, authors.size());
        verify(authorRepository, times(1)).findAll();
    }

    @Test
    public void testGetAuthorById() {
        Author author = new Author();
        author.setName("Author Name");

        when(authorRepository.findById(1L)).thenReturn(Optional.of(author));

        Author foundAuthor = authorService.getAuthorById(1L);

        assertNotNull(foundAuthor);
        assertEquals("Author Name", foundAuthor.getName());
        verify(authorRepository, times(1)).findById(1L);
    }
}
