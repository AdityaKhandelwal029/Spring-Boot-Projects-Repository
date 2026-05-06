import axios from 'axios';

// Base URL of the Spring Boot REST API
const API_BASE_URL = 'http://localhost:8080/api/employees';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

const employeeService = {
  // GET all employees
  getAll: () => api.get(''),

  // GET employee by id
  getById: (id) => api.get(`/${id}`),

  // POST create new employee
  create: (employee) => api.post('', employee),

  // PUT update existing employee
  update: (id, employee) => api.put(`/${id}`, employee),

  // DELETE employee
  remove: (id) => api.delete(`/${id}`),
};

export default employeeService;
