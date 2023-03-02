
const getByRefreshToken = `SELECT * FROM users WHERE refreshToken = $1`

const updateUserToken = `UPDATE users SET refreshToken = $1 WHERE email = $2`

module.exports = { 
    getByRefreshToken,
    updateUserToken
    };