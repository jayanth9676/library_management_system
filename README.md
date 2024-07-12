# Library Management System

## Overview
This is a Spring Boot application for managing books and authors in a library. The application provides RESTful endpoints to add, update, retrieve, and delete books and authors.

## Features
- Add a new book
- Add a new author
- Retrieve a list of all books
- Retrieve a list of all authors
- Retrieve a list of all books by a specific author
- Update book details
- Delete a book

## Technologies Used
- Java
- Spring Boot
- Spring Data JPA
- H2 Database
- Mockito
- JUnit 5
- Swagger

## Prerequisites
- Java 8 or higher
- Maven

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/jayanth9676/library_management_system.git
cd library_management_system
```

### 2. Build the Project
```bash
mvn clean install
```
### 3. Run the Application
```bash
mvn spring-boot:run
```
The application will start on http://localhost:8080.

### 4. Access Swagger UI
You can access the Swagger UI for API documentation and testing at http://localhost:8080/swagger-ui.html.

### 5. Running the Tests
To run the unit and integration tests, execute the following command:

```bash
mvn test
```

### Assumptions
- The application uses an in-memory H2 database, which is initialized on startup.
- Swagger is used for API documentation.
- No third-party libraries or frameworks are used beyond those specified.

### API Endpoints
#### Authors
- POST /authors

- - Add a new author
- - Request body: { "name": "Author Name", "biography": "Author Biography" }

- GET /authors

- - Retrieve a list of all authors
- - GET /authors/{authorId}/books

- - Retrieve a list of all books by a specific author

#### Books
- POST /books

- - Add a new book
- - Request body: { "title": "Book Title", "isbn": "123456", "authorId": 1 }

- GET /books

- - Retrieve a list of all books

- PUT /books/{bookId}

- - Update book details
- - Request body: { "title": "Updated Title", "isbn": "654321", "authorId": 1 }

- DELETE /books/{bookId}

- - Delete a book

### Deployment
Created React.js frontend part, but deployment is left.