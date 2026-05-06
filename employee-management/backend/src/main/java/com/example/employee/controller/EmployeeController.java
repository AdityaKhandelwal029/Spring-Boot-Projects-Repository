package com.example.employee.controller;

import com.example.employee.entity.Employee;
import com.example.employee.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller exposing CRUD endpoints for Employee.
 *
 * Endpoints:
 *   GET    /api/employees       - list all
 *   GET    /api/employees/{id}  - get by id
 *   POST   /api/employees       - create
 *   PUT    /api/employees/{id}  - update
 *   DELETE /api/employees/{id}  - delete
 *
 * @CrossOrigin allows the React frontend (running on localhost:3000)
 * to call these endpoints. In production prefer a more restrictive CORS config.
 */
@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    /** GET /api/employees -> 200 OK + list of employees. */
    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    /** GET /api/employees/{id} -> 200 OK or 404 Not Found. */
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    /**
     * POST /api/employees -> 201 Created + created entity.
     * @Valid triggers Bean Validation on the request body. Failures are
     * caught by GlobalExceptionHandler and returned as 400 Bad Request.
     */
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@Valid @RequestBody Employee employee) {
        Employee created = employeeService.createEmployee(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /** PUT /api/employees/{id} -> 200 OK or 404 Not Found. */
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable Long id,
            @Valid @RequestBody Employee employee) {
        Employee updated = employeeService.updateEmployee(id, employee);
        return ResponseEntity.ok(updated);
    }

    /** DELETE /api/employees/{id} -> 204 No Content or 404 Not Found. */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}
