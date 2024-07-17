package com.example.library_management_system.controller;

import com.example.library_management_system.entity.Book;
import com.example.library_management_system.service.BookService;
//import io.swagger.annotations.Api;
//import io.swagger.annotations.ApiOperation;
//import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000")
//@Api(value = "Book Management", description = "Manage books in the library")
public class BookController {

    @Autowired
    private BookService bookService;

//    @ApiOperation(value = "Create a new book", notes = "Add a new book to the library")
//    @ApiResponse(responseCode = "201", description = "Book created successfully")
    @PostMapping("/books")
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        Book savedBook = bookService.addBook(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBook);
    }


//    @ApiOperation(value = "Retrieve all books", notes = "Get a list of all books in the library")
    @GetMapping("/books")
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }

//    @ApiOperation(value = "Retrieve books by Author ID", notes = "Get the details of a list of books by a specific author")
//    @ApiResponse(responseCode = "404", description = "Author not found")
    @GetMapping("/authors/{authorId}/books")
    public ResponseEntity<List<Book>> getBooksByAuthorId(@PathVariable Long authorId) {
        List<Book> books = bookService.getBooksByAuthorId(authorId);
        return ResponseEntity.ok(books);
    }


    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Book book = bookService.getBookById(id);
        return ResponseEntity.ok(book);
    }

//    @ApiOperation(value = "Update a book", notes = "Modify the details of an existing book")
//    @ApiResponse(responseCode = "404", description = "Book not found")
    @PutMapping("/books/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book book) {
        Book updatedBook = bookService.updateBook(id, book);
        return ResponseEntity.ok(updatedBook);
    }


//    @ApiOperation(value = "Delete a book", notes = "Remove a book from the library")
//    @ApiResponse(responseCode = "204", description = "Book deleted successfully")
    @DeleteMapping("/books/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}
