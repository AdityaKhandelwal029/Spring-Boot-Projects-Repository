package com.example.employee.repository;

import com.example.employee.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for Employee.
 * Extending JpaRepository provides built-in CRUD methods
 * (save, findAll, findById, deleteById, etc.) without writing implementations.
 */
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // Custom finder method - Spring Data generates the implementation automatically
    boolean existsByEmail(String email);
}
