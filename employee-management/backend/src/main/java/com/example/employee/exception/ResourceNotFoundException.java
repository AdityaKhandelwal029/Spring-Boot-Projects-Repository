package com.example.employee.exception;

/**
 * Custom unchecked exception thrown when an Employee record is not found.
 * This is mapped to HTTP 404 by the GlobalExceptionHandler.
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
