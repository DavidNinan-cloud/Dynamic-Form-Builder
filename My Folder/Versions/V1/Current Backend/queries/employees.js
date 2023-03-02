
const getEmployees = `SELECT * FROM employees ORDER BY id ASC`

const getEmployeeById = `SELECT * FROM employees WHERE id = $1`

const createEmployee = `INSERT INTO employees (id, firstname, lastname) VALUES ($1, $2, $3)`

const updateEmployee = `UPDATE employees SET firstname = $1, lastname = $2 WHERE id = $3`

const deleteEmployee = `DELETE FROM employees WHERE id = $1`


// all queries

module.exports = {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
  }