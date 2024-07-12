package com.example.library_management_system.controller;

import com.example.library_management_system.entity.Author;
import com.example.library_management_system.service.AuthorService;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/authors")
@Tag(name = "Author Management", description = "Manage authors in the library")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @ApiOperation(value = "Create a new author", notes = "Add a new author to the library")
    @ApiResponse(responseCode = "201", description = "Author created successfully")
    @PostMapping
    public ResponseEntity<Author> addAuthor(@RequestBody Author author) {
        Author savedAuthor = authorService.addAuthor(author);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAuthor);
    }

    @ApiOperation(value = "Retrieve all authors", notes = "Get a list of all authors in the library")
    @GetMapping
    public ResponseEntity<List<Author>> getAllAuthors() {
        List<Author> authors = authorService.getAllAuthors();
        return ResponseEntity.ok(authors);
    }
}
