
const get_fund_details = `SELECT * FROM fund_details ORDER BY fund_name ASC`
const get_fund_nav = `SELECT * FROM fund_nav ORDER BY date DESC`


const edit_fund_details = `UPDATE fund_details SET fund_name = $1, fund_commission = $2, fund_expense_ratio = $3, fund_nav = $4, fund_AUM = $5, units_declared = $6 WHERE fund_id = $7`
const edit_fund_QTY = `UPDATE fund_details SET units_declared = $1 WHERE fund_id = $2`
const edit_fund_nav = `UPDATE fund_details SET fund_nav = $1 WHERE fund_id = $2`

const add_nav = `INSERT INTO fund_nav (nav_rate, date, fund_id) VALUES ($1, $2, $3) and
                  UPDATE fund_details SET fund_nav = $1 WHERE fund_id = $3;`

module.exports = {
    get_fund_details,
    get_fund_nav,
    edit_fund_details,
    edit_fund_QTY,
    edit_fund_nav,
    add_nav,
  }