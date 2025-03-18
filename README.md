# Driving Test Management System

## Introduction
This is a full-stack Driving Test Management System with role-based authentication using JWT. The system includes Admin, Examiner, and Driver roles, each with specific permissions.

## Project Structure
- `client/` - React frontend using Vite and Tailwind CSS
- `server/` - Spring Boot backend with MySQL

## Prerequisites
Before running the application, ensure you have the following installed:
- Java 23
- Maven
- Node.js & npm
- MySQL
- An IDE (IntelliJ IDEA, Eclipse, VS Code, etc.)

## Database Setup (Backend)
1. Open MySQL and create a database named `drivingtest` locally or through the command line:
   ```sql
   CREATE DATABASE drivingtest;
   ```
2. Update the `application.properties` file to match your system's MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/drivingtest
   spring.datasource.username=root
   spring.datasource.password=admin
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
   spring.mvc.hiddenmethod.filter.enabled=true
   ```

## Running the Backend
1. Navigate to the `server` directory:
   ```sh
   cd server
   ```
2. Build the project using Maven:
   ```sh
   mvn clean install
   ```
3. Run the Spring Boot application:
   ```sh
   mvn spring-boot:run
   ```

## Running the Frontend
1. Navigate to the `client` directory:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## API Endpoints
### Authentication
- `POST /api/auth/login` - Logs in a user and returns a JWT token.
- `POST /api/auth/signup` - Registers a new user.

### Admin Endpoints
- `POST /admin/available-appointments` - Admin can post test dates.

### Driver Endpoints
- `GET /appointments/available` - Driver can check available test dates.
- `GET /driver/status` - Shows pass or fail status after the test.
- `GET /driver/booked-appointment` - Fetch booked appointment.
- `POST /driver/add-car-details` - Add car details.
- `POST /driver/book-appointment/${appointmentId}` - Book an available appointment.

### Examiner Endpoints
- `GET /examiner/appointments` - Fetch all appointments assigned to the examiner.
- `POST /examiner/update-result/${appointmentId}/${result}` - Examiner can pass or fail a driver.

## Dependencies
The project uses the following dependencies:
### Backend
- Spring Boot Web
- Spring Boot Security (for authentication and JWT handling)
- Spring Boot Data JPA
- MySQL Connector
- Lombok
- JSON Web Token (JWT) for authentication

### Frontend
- React (Vite as a template)
- Tailwind CSS for styling
- React Router for navigation

## Notes
- Make sure MySQL is running before starting the application.
- Default credentials for MySQL are set in `application.properties`. Modify them as needed.

## License
This project is licensed under the MIT License.

