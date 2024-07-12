package com.example.library_management_system.repository;

import com.example.library_management_system.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByAuthorId(Long authorId);
}
