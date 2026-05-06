# Employee Management System

A full-stack CRUD application for managing employee records, built with Spring Boot, H2 in-memory database, and a React frontend.

## Tech Stack

**Backend**
- Java 17
- Spring Boot 3.3.4
- Spring Data JPA
- Spring Validation (Jakarta Bean Validation)
- H2 In-Memory Database
- Maven

**Frontend**
- React 18
- Axios (HTTP client)
- Plain CSS

---

## Project Structure

```
employee-management/
├── backend/                   # Spring Boot REST API
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/example/employee/
│       │   ├── EmployeeManagementApplication.java
│       │   ├── controller/EmployeeController.java
│       │   ├── entity/Employee.java
│       │   ├── repository/EmployeeRepository.java
│       │   ├── service/EmployeeService.java
│       │   └── exception/
│       │       ├── ResourceNotFoundException.java
│       │       └── GlobalExceptionHandler.java
│       └── resources/
│           ├── application.properties
│           └── data.sql
└── frontend/                  # React UI
    ├── package.json
    ├── public/index.html
    └── src/
        ├── App.js, App.css
        ├── index.js, index.css
        ├── components/
        │   ├── EmployeeList.js
        │   └── EmployeeForm.js
        └── services/employeeService.js
```

---

## How to Run

### 1. Run the Backend (Spring Boot)

Prerequisites: **Java 17+** and **Maven 3.6+**

```bash
cd backend
mvn spring-boot:run
```

The backend starts on **http://localhost:8080**.

H2 console is available at **http://localhost:8080/h2-console**
- JDBC URL: `jdbc:h2:mem:employeedb`
- User: `sa` (no password)

### 2. Run the Frontend (React)

Prerequisites: **Node.js 16+** and **npm**

```bash
cd frontend
npm install
npm start
```

The frontend starts on **http://localhost:3000**.

---

## REST API Reference

Base URL: `http://localhost:8080/api/employees`

| Method | Endpoint              | Description           | Success Status |
|--------|-----------------------|-----------------------|----------------|
| GET    | `/api/employees`      | Get all employees     | 200 OK         |
| GET    | `/api/employees/{id}` | Get employee by ID    | 200 OK         |
| POST   | `/api/employees`      | Create new employee   | 201 Created    |
| PUT    | `/api/employees/{id}` | Update employee       | 200 OK         |
| DELETE | `/api/employees/{id}` | Delete employee       | 204 No Content |

### Sample Request Body

```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "age": 28,
  "department": "Engineering",
  "salary": 75000.00
}
```

### Error Responses

| Status | When                                                |
|--------|-----------------------------------------------------|
| 400    | Validation failed (e.g. age <= 18, name empty)      |
| 404    | Employee with the given ID does not exist           |
| 409    | Email already in use                                |
| 500    | Unhandled server-side error                         |

---

## Validation Rules

| Field      | Rule                                     |
|------------|------------------------------------------|
| name       | Not blank, 2–100 characters              |
| email      | Not blank, valid email format, unique    |
| age        | Greater than 18, max 100                 |
| department | Not blank                                |
| salary     | Greater than 0                           |

---

## Testing the API with cURL

```bash
# Get all employees
curl http://localhost:8080/api/employees

# Create new employee
curl -X POST http://localhost:8080/api/employees \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","age":25,"department":"Engineering","salary":60000}'

# Update employee
curl -X PUT http://localhost:8080/api/employees/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name","email":"updated@example.com","age":30,"department":"Marketing","salary":70000}'

# Delete employee
curl -X DELETE http://localhost:8080/api/employees/1

# Try invalid age (should return 400)
curl -X POST http://localhost:8080/api/employees \
  -H "Content-Type: application/json" \
  -d '{"name":"Young User","email":"young@example.com","age":15,"department":"Engineering","salary":50000}'
```

---

## Notes

- The H2 database is **in-memory**: data resets every time the backend restarts. Sample data in `data.sql` is loaded automatically on startup.
- CORS is configured to allow requests from `http://localhost:3000`.
- All form validation is enforced both on the client (React) and server (Bean Validation).
