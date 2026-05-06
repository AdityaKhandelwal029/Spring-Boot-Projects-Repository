import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import employeeService from './services/employeeService';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [notification, setNotification] = useState(null);

  // Helper to flash a toast-style notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Fetch all employees from the backend
  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const response = await employeeService.getAll();
      setEmployees(response.data);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      showNotification(
        'Failed to load employees. Make sure the backend is running on port 8080.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleAddClick = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleSubmit = async (employeeData) => {
    try {
      if (editingEmployee) {
        await employeeService.update(editingEmployee.id, employeeData);
        showNotification('Employee updated successfully');
      } else {
        await employeeService.create(employeeData);
        showNotification('Employee added successfully');
      }
      handleCloseForm();
      fetchEmployees();
    } catch (error) {
      const data = error.response?.data;
      let message = 'Operation failed';

      if (data?.fieldErrors) {
        // Combine all server-side field errors into one message
        message = Object.entries(data.fieldErrors)
          .map(([field, msg]) => `${field}: ${msg}`)
          .join(' • ');
      } else if (data?.message) {
        message = data.message;
      }

      showNotification(message, 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      await employeeService.remove(id);
      showNotification('Employee deleted successfully');
      fetchEmployees();
    } catch (error) {
      showNotification(
        error.response?.data?.message || 'Failed to delete employee',
        'error'
      );
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="brand">
            <div className="logo">EM</div>
            <div>
              <h1>Employee Management</h1>
              <p>Spring Boot · React · H2 Database</p>
            </div>
          </div>
          <button className="btn btn-primary" onClick={handleAddClick}>
            + Add Employee
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="stats-bar">
          <div className="stat">
            <span className="stat-label">Total Employees</span>
            <span className="stat-value">{employees.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Departments</span>
            <span className="stat-value">
              {new Set(employees.map((e) => e.department)).size}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Average Age</span>
            <span className="stat-value">
              {employees.length
                ? Math.round(
                    employees.reduce((sum, e) => sum + e.age, 0) / employees.length
                  )
                : 0}
            </span>
          </div>
        </div>

        <EmployeeList
          employees={employees}
          onEdit={handleEditClick}
          onDelete={handleDelete}
          loading={loading}
        />
      </main>

      {showForm && (
        <EmployeeForm
          editingEmployee={editingEmployee}
          onSubmit={handleSubmit}
          onCancel={handleCloseForm}
        />
      )}

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default App;
