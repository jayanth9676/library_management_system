# Build stage for Maven and React
FROM maven:3.8.5-openjdk-17 AS build

# Copy all project files including the React app
COPY . .

# Build the React app
RUN cd app && npm install && npm run build

# Package the Spring Boot application, skipping tests
RUN mvn clean package -DskipTests

# Final stage with just the JDK and packaged JAR
FROM openjdk:17.0.1-jdk-slim

# Copy the built JAR from the build stage
COPY --from=build /target/library_management_system-0.0.1-SNAPSHOT.jar library_management_system.jar

# Copy the built React app into the Spring Boot static resources
COPY --from=build /app/build /app/build

# Expose the port
EXPOSE 8080

# Run the Spring Boot application with the 'prod' profile
ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "library_management_system.jar"]
