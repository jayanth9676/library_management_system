//package com.example.library_management_system.service;
//
//import com.example.library_management_system.entity.Book;
//import com.example.library_management_system.repository.BookRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//
//import java.util.Arrays;
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertNotNull;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.*;
//
//public class BookServiceTest {
//
//    @Mock
//    private BookRepository bookRepository;
//
//    @InjectMocks
//    private BookService bookService;
//
//    @BeforeEach
//    public void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    public void testAddBook() {
//        Book book = new Book();
//        book.setTitle("Book Title");
//        book.setIsbn("123456");
//        book.setAuthorId(1L);
//
//        when(bookRepository.save(any(Book.class))).thenReturn(book);
//
//        Book createdBook = bookService.addBook(book);
//
//        assertNotNull(createdBook);
//        assertEquals("Book Title", createdBook.getTitle());
//        verify(bookRepository, times(1)).save(book);
//    }
//
//    @Test
//    public void testGetAllBooks() {
//        Book book1 = new Book();
//        book1.setTitle("Book One");
//        book1.setIsbn("123456");
//        book1.setAuthorId(1L);
//
//        Book book2 = new Book();
//        book2.setTitle("Book Two");
//        book2.setIsbn("789101");
//        book2.setAuthorId(1L);
//
//        when(bookRepository.findAll()).thenReturn(Arrays.asList(book1, book2));
//
//        List<Book> books = bookService.getAllBooks();
//
//        assertEquals(2, books.size());
//        verify(bookRepository, times(1)).findAll();
//    }
//
//    @Test
//    public void testGetBooksByAuthorId() {
//        Book book1 = new Book();
//        book1.setTitle("Book One");
//        book1.setIsbn("123456");
//        book1.setAuthorId(1L);
//
//        Book book2 = new Book();
//        book2.setTitle("Book Two");
//        book2.setIsbn("789101");
//        book2.setAuthorId(1L);
//
//        when(bookRepository.findByAuthorId(1L)).thenReturn(Arrays.asList(book1, book2));
//
//        List<Book> books = bookService.getBooksByAuthorId(1L);
//
//        assertEquals(2, books.size());
//        verify(bookRepository, times(1)).findByAuthorId(1L);
//    }
//
//    @Test
//    public void testUpdateBook() {
//        Book book = new Book();
//        book.setTitle("Book Title");
//        book.setIsbn("123456");
//        book.setAuthorId(1L);
//
//        Book updatedBookDetails = new Book();
//        updatedBookDetails.setTitle("Updated Title");
//        updatedBookDetails.setIsbn("654321");
//        updatedBookDetails.setAuthorId(1L);
//
//        when(bookRepository.findById(1L)).thenReturn(Optional.of(book));
//        when(bookRepository.save(any(Book.class))).thenReturn(updatedBookDetails);
//
//        Book updatedBook = bookService.updateBook(1L, updatedBookDetails);
//
//        assertNotNull(updatedBook);
//        assertEquals("Updated Title", updatedBook.getTitle());
//        verify(bookRepository, times(1)).findById(1L);
//        verify(bookRepository, times(1)).save(updatedBook);
//    }
//
//    @Test
//    public void testDeleteBook() {
//        bookService.deleteBook(1L);
//        verify(bookRepository, times(1)).deleteById(1L);
//    }
//}
