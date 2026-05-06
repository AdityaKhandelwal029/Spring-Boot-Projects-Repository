import React, { useState, useEffect } from 'react';

const EMPTY_FORM = {
  name: '',
  email: '',
  age: '',
  department: '',
  salary: '',
};

function EmployeeForm({ onSubmit, onCancel, editingEmployee }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  // Pre-fill the form when editing an existing employee
  useEffect(() => {
    if (editingEmployee) {
      setForm({
        name: editingEmployee.name || '',
        email: editingEmployee.email || '',
        age: editingEmployee.age?.toString() || '',
        department: editingEmployee.department || '',
        salary: editingEmployee.salary?.toString() || '',
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [editingEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Client-side validation mirrors the backend rules
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    else if (form.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';

    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email format';

    if (!form.age) newErrors.age = 'Age is required';
    else if (parseInt(form.age, 10) <= 18) newErrors.age = 'Age must be greater than 18';

    if (!form.department.trim()) newErrors.department = 'Department is required';

    if (!form.salary) newErrors.salary = 'Salary is required';
    else if (parseFloat(form.salary) <= 0) newErrors.salary = 'Salary must be greater than 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      age: parseInt(form.age, 10),
      department: form.department.trim(),
      salary: parseFloat(form.salary),
    };
    onSubmit(payload);
  };

  return (
    <div className="form-overlay" onClick={onCancel}>
      <div className="form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2>{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</h2>
          <button className="close-btn" onClick={onCancel} aria-label="Close">×</button>
        </div>

        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane.doe@example.com"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="25"
                min="19"
                className={errors.age ? 'input-error' : ''}
              />
              {errors.age && <span className="error-message">{errors.age}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="salary">Salary</label>
              <input
                id="salary"
                type="number"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                placeholder="50000"
                step="0.01"
                min="0"
                className={errors.salary ? 'input-error' : ''}
              />
              {errors.salary && <span className="error-message">{errors.salary}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={form.department}
              onChange={handleChange}
              className={errors.department ? 'input-error' : ''}
            >
              <option value="">-- Select Department --</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
            </select>
            {errors.department && <span className="error-message">{errors.department}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingEmployee ? 'Update Employee' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
