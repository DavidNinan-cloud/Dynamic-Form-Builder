const queries = require('../queries/user_queries')
const {pool} = require('../config/dbConn')
const { v4 : uuidv4} = require('uuid')
const returnMsgs = require('../commonfunctions/returnStatus')



// true
const getUserTransactionById = (request, response) => {
    const user_id = parseInt(request.query.user_id)
    if (!user_id) {
        console.log('error createNewUser : Data missing');
        return response.status(400).json(returnMsgs.fnReturn400());
    }
    else{
        pool.query(queries.getByID_User_Fund_Trasactions, [user_id], (error, results) => {
            if (error) {
                console.log('error createNewUser : Data missing');
                return response.status(400).json(returnMsgs.fnReturn400());
            }else {      
                let headers = []
                let fields = results.fields
                for (let item of fields){
                  headers.push(item.name)
                }
                const structuredResult = {
                    actions : ["Edit","Delete"],
                    headers : headers,
                    result : results.rows,
                    count : results.rowCount,
                    statusCode : 200
                }
                console.log('getUserTransactionById success');
                response.status(200).json(structuredResult)
            }    
        })
    }
}

const createNewUserTransaction = (request, response) => {   
    const { user_id, date, credited, at_nav, units} = request.body
    // check if user exists 

    // 
    if (!user_id || !date ||credited === null || credited === "" || !at_nav || !units) {
        return response.status(400).json({ "message": `Missing Data` });
    }
    pool.query(queries.create_user_transaction, [user_id, date, credited, at_nav, units], (error, results) => {
        if (error) {
            console.log('error',error);
            return response.status(500).json({ "message": error });
        }
        console.log('createNewUserTransaction success');
        response.status(201).json({ "message": "User Transactions Created Successfully" })
    })
}
const deleteUserTransaction = (request, response) => {
    
    if (!transaction_id) {
        return response.status(400).json({ 'message': 'Missing data' });
    }
    pool.query(queries.delete_user_transaction, [transaction_id], (error, results) => {
        if (error) {
            response.status(500).json({message:'Internal Server Error'});
        }
        response.status(200).send(`User deleted Successfully`)
    })
}
const updateUserTransaction =  (request, response) => {
    const { date, credited, at_nav, units, transactions_id } = request.body
    if (!date || credited === null || credited === "" || !at_nav || !units || !transactions_id) {
        return response.status(400).json({ "message": `incomplete details` });
    }
    pool.query(
        queries.update_user_transaction,
        [date, credited, at_nav, units, transactions_id],
        (error, results) => {
        if (error) {
            return response.status(500).json({ "message": error });
        }else{
            console.log('updateUserTransaction success');
            response.status(201).send(`transaction modified `)
        }
        }
    )
}
// ##########################################################
module.exports = {
    getUserTransactionById,
    createNewUserTransaction,
    deleteUserTransaction,
    updateUserTransaction
}