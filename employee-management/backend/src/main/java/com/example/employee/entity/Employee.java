package com.example.employee.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

/**
 * Employee JPA entity representing the EMPLOYEES table in the H2 database.
 * Bean Validation annotations enforce the business rules
 * (e.g., name must not be blank, age must be greater than 18).
 */
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name must not be empty")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    @Column(nullable = false, length = 100)
    private String name;

    @NotBlank(message = "Email must not be empty")
    @Email(message = "Email must be a valid email address")
    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @NotNull(message = "Age must not be null")
    @Min(value = 19, message = "Age must be greater than 18")
    @Max(value = 100, message = "Age must be less than or equal to 100")
    @Column(nullable = false)
    private Integer age;

    @NotBlank(message = "Department must not be empty")
    @Column(nullable = false, length = 50)
    private String department;

    @NotNull(message = "Salary must not be null")
    @DecimalMin(value = "0.0", inclusive = false, message = "Salary must be greater than 0")
    @Column(nullable = false)
    private Double salary;

    // Default constructor required by JPA
    public Employee() {
    }

    public Employee(String name, String email, Integer age, String department, Double salary) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.department = department;
        this.salary = salary;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }
}
