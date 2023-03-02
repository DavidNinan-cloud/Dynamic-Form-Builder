const queries = require('../queries/user_queries')
const {pool} = require('../config/dbConn')
const returnMsgs = require('../commonfunctions/returnStatus');
const { roundToTwo } = require('../commonfunctions/DataValidator');

// yes
const getUserDetailsById = (request, response) => {
    console.log('request query',request.query);
    console.log('request params',request.params);
    console.log('request body',request.body);
    const user_id = request.query.user_id
    if (!user_id) {
        console.log('getUserDetailsById error', 'Missing data');
        return response.status(400).json(returnMsgs.fnReturn400());
    }
    else{

        pool.query(queries.getByID_User_Fund_Details, [user_id], (error, results) => {
            if (error) {
                console.log('getUserDetailsById error', error);
                response.status(500).json(returnMsgs.fnReturn500(error));
            }else {       
                let headers = [
                    'user_id',
                    'User Invested', 
                    'User Commission',
                    'User Expense',
                    'User Taxes',
                    'User Units']
        
                let finalResult = []
                for(let item of results.rows){
                  let obj = {
                        user_id: item.user_id,
                        'User Invested' : roundToTwo(item.user_invested),
                        'User Commission': roundToTwo(item.user_commission),
                        'User Expense' : roundToTwo(item.user_expense),
                        'User Taxes' : roundToTwo(item.user_taxes),
                        'User Units' : roundToTwo(item.user_units)
                  }
                  finalResult.push(obj)
                }
                const structuredResult = {
                    actions : [],
                    headers : headers,
                    result : finalResult,
                    count : results.rowCount,
                    statusCode : 200
                }
                response.status(200).json(structuredResult)
                console.log('getUserDetailsById success');
            }    
        })
    }
}
// ###########################################


const updateUserInvestmentDetails = (request, response) => {
    const { user_id, user_invested, user_units, } = request.body
    if (!user_id || !user_invested || !user_units) {
        console.log('updateUserInvestmentDetails error', 'Missing data');
        return response.status(400).json(returnMsgs.fnReturn400());
    }
    pool.query(
        queries.update_user_fund_details_Investments,
        [user_invested, user_units, user_id],
        (error, results) => {
        if (error) {
            console.log('updateUserInvestmentDetails error', error);
            response.status(500).json(returnMsgs.fnReturn500(error));
        }else{
            console.log('updateUserDetails success');
            response.status(201).json(returnMsgs.fnReturn200("User Created Successfully"))
        }
        }
    )
}

const updateUserDetails = (request, response) => {
    const { user_id,
        user_commission,
        user_expense,
        user_taxes } = request.body
    if (!user_id || !user_commission || !user_expense || !user_taxes) {
        return response.status(400).json({ "message": `incomplete details` });
    }
    pool.query(
        queries.update_user_fund_details,
        [user_commission, user_expense, user_taxes, user_id],
        (error, results) => {
        if (error) {
            return response.status(500).json({ "message": error });
        }else{
            console.log('updateUserDetails success');
            response.status(201).send(`user details updated`)
        }
        }
    )
}

module.exports = {
    getUserDetailsById,
    updateUserDetails,
    updateUserInvestmentDetails
}