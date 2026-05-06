import React from 'react';

function EmployeeList({ employees, onEdit, onDelete, loading }) {
  if (loading) {
    return (
      <div className="empty-state">
        <p>Loading employees…</p>
      </div>
    );
  }

  if (!employees.length) {
    return (
      <div className="empty-state">
        <h3>No employees yet</h3>
        <p>Click <strong>“+ Add Employee”</strong> to get started.</p>
      </div>
    );
  }

  // Format a number as INR currency
  const formatSalary = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="table-wrapper">
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Department</th>
            <th>Salary</th>
            <th className="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td className="muted">#{emp.id}</td>
              <td>
                <div className="name-cell">
                  <div className="avatar">{emp.name.charAt(0).toUpperCase()}</div>
                  <span>{emp.name}</span>
                </div>
              </td>
              <td className="muted">{emp.email}</td>
              <td>{emp.age}</td>
              <td><span className="dept-badge">{emp.department}</span></td>
              <td className="salary">{formatSalary(emp.salary)}</td>
              <td>
                <div className="action-buttons">
                  <button
                    className="btn-icon btn-edit"
                    onClick={() => onEdit(emp)}
                    title="Edit"
                  >
                    Edit
                  </button>
                  <button
                    className="btn-icon btn-delete"
                    onClick={() => onDelete(emp.id)}
                    title="Delete"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
