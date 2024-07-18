# Stage 1: Build the React app
FROM node:18 AS frontend-build
WORKDIR /app
COPY ./app .
RUN npm install && npm run build

# Stage 2: Build the Spring Boot application
FROM maven:3.8.5-openjdk-17 AS backend-build
COPY . .
RUN mvn clean package -DskipTests

# Stage 3: Final stage with just the JDK and packaged JAR
FROM openjdk:17.0.1-jdk-slim

# Copy the built JAR from the backend build stage
COPY --from=backend-build /target/library_management_system-0.0.1-SNAPSHOT.jar library_management_system.jar

# Copy the built React app into the Spring Boot static resources
COPY --from=frontend-build /app/build /static

# Expose the port
EXPOSE 8080

# Run the Spring Boot application with the 'prod' profile
ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "library_management_system.jar"]
