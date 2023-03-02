
const getEmployeeByUserName = `SELECT * FROM users WHERE email = $1`
const updateUserToken = `UPDATE users SET refreshToken = $1 WHERE email = $2`


module.exports = { 
    getEmployeeByUserName,
    updateUserToken };