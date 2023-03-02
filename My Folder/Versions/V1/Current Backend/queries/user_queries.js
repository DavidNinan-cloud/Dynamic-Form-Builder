// completed
const getByID_User_Fund_Details = `SELECT * FROM user_fund_details WHERE user_id = $1`
const update_user_fund_details_Investments = 'UPDATE user_fund_details SET user_invested = $1, user_units = $2 WHERE user_id = $3'
const update_user_fund_details = 'UPDATE user_fund_details SET user_commission = $1, user_expense = $2, user_taxes = $3 WHERE user_id = $4'


const create_user_fund_details = `INSERT INTO user_fund_details (user_id, user_invested,user_commission, user_expense, user_taxes,user_units) VALUES ($1, $2, $3, $4, $5, $6)`
const delete_user_fund_details = `DELETE FROM user_fund_details WHERE user_id = $1`

// tested
const get_all_users_and_fund_details = `SELECT
      users.user_id, user_name, email, 
      isAdmin, 
      user_invested,
      user_commission,
      user_expense,
      user_taxes,
      user_units
      FROM
      users
      INNER JOIN user_fund_details ON users.user_id = user_fund_details.user_id
      ORDER BY user_name ASC;`
const create_users = `INSERT INTO users (user_id, user_name,hashed_password, email, isadmin) VALUES ($1, $2, $3, $4, $5)`
const delete_user = `DELETE FROM users WHERE user_id = $1`
const delete_user_transactions = `DELETE FROM users WHERE user_id = $1`
const update_user = `UPDATE users SET user_name = $1, email = $2, isadmin = $3, hashed_password = $4 WHERE user_id = $5`

const insert_deleted_user = `INSERT INTO deleted_users (user_id, user_name,email, isadmin) VALUES ($1, $2, $3, $4)`
// completed
// const get_all_users_transactions = `SELECT * FROM user_fund_transactions ORDER BY date DESC`
const getByID_User_Fund_Trasactions = `SELECT * FROM user_fund_transactions WHERE user_id = $1 ORDER BY date DESC`
const create_user_transaction = `INSERT INTO user_fund_transactions (user_id, date, credited, at_nav, units) VALUES ($1, $2, $3, $4, $5)`
const delete_user_transaction = `DELETE FROM user_fund_transactions WHERE transactions_id = $1`
const update_user_transaction = `UPDATE user_fund_transactions SET date = $1, credited = $2, at_nav = $3, units = $4 WHERE transactions_id = $5`

module.exports = {
      get_fund_details,
      get_fund_nav,
      edit_fund_details,
      edit_fund_QTY,
      edit_fund_nav,
      add_nav,
      getByID_User_Fund_Details,
      update_user_fund_details,
      update_user_fund_details_Investments,
      create_user_fund_details,
      delete_user_fund_details,
      get_all_users_and_fund_details,
      create_users,
      delete_user,
      delete_user_detail,
      delete_user_transactions,
      update_user,
      getByID_User_Fund_Trasactions,
      create_user_transaction,
      delete_user_transaction,
      update_user_transaction,
      insert_deleted_user
  }