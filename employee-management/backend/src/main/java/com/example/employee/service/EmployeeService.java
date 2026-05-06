package com.example.employee.service;

import com.example.employee.entity.Employee;
import com.example.employee.exception.ResourceNotFoundException;
import com.example.employee.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service layer holding the business logic for Employee operations.
 * Sits between the Controller (HTTP layer) and the Repository (data layer).
 */
@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    /** GET all employees. */
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    /** GET a single employee by ID, or throw 404 if missing. */
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Employee not found with id: " + id));
    }

    /** CREATE a new employee. */
    public Employee createEmployee(Employee employee) {
        if (employeeRepository.existsByEmail(employee.getEmail())) {
            throw new IllegalArgumentException(
                    "Email already exists: " + employee.getEmail());
        }
        return employeeRepository.save(employee);
    }

    /** UPDATE an existing employee (full replace). */
    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        Employee existing = getEmployeeById(id); // throws 404 if not present

        // If email is being changed, ensure new email isn't already taken
        if (!existing.getEmail().equals(updatedEmployee.getEmail())
                && employeeRepository.existsByEmail(updatedEmployee.getEmail())) {
            throw new IllegalArgumentException(
                    "Email already exists: " + updatedEmployee.getEmail());
        }

        existing.setName(updatedEmployee.getName());
        existing.setEmail(updatedEmployee.getEmail());
        existing.setAge(updatedEmployee.getAge());
        existing.setDepartment(updatedEmployee.getDepartment());
        existing.setSalary(updatedEmployee.getSalary());

        return employeeRepository.save(existing);
    }

    /** DELETE an employee by ID. */
    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Employee not found with id: " + id);
        }
        employeeRepository.deleteById(id);
    }
}
