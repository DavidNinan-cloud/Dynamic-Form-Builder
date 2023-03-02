const queries = require('../queries/user_queries')
const fundqueries = require('../queries/fund_queries')
const {pool} = require('../config/dbConn')
const { v4 : uuidv4} = require('uuid')
const bcrypt = require('bcrypt');
const returnMsgs = require('../commonfunctions/returnStatus')
const {roundToTwo} = require('../commonfunctions/DataValidator')

// yes
const getAllUsers = (request, response) => {
    pool.query(queries.get_all_users_and_fund_details, (error, results) => {
      if (error) {
        console.log('error getAllUsers : ',error);
        response.status(500).json(returnMsgs.fnReturn500(error));
      }else{
        let headers = [
            'user_id',
            'Email',
            'User Name',
            'Is Admin',
            'User Invested',
            'User Commission',
            'User Expense',
            'User Taxes',
            'User Units']

        let finalResult = []
        for(let item of results.rows){
          let obj = {
                user_id: item.user_id,
                'User Name': item.user_name,
                'Email': item.email,
                'Is Admin': item.isadmin,
                'User Invested' : roundToTwo(item.user_invested),
                'User Commission': roundToTwo(item.user_commission),
                'User Expense' : roundToTwo(item.user_expense),
                'User Taxes' : roundToTwo(item.user_taxes),
                'User Units' : roundToTwo(item.user_units)
          }
          finalResult.push(obj)
        }
        const structuredResult = {
            actions : ["Edit","Delete"],
            headers : headers,
            result : finalResult,
            count : results.rowCount,
            statusCode : 200
        }
        console.log('getAllUsers success');
        response.status(200).json(structuredResult)
      }      
    })
}
const createNewUser = async(request, response) => {
    const { user_name,password, email, isAdmin } = request.body
    const user_id = uuidv4()
    if (!password || !user_id || !user_name ||!email || isAdmin === null || isAdmin === "") {
        console.log('error createNewUser : Data missing');
        return response.status(400).json(returnMsgs.fnReturn400());
    }else{    
        try {
        //encrypt the password
            const hashedPwd = await bcrypt.hash(password, 10);
            pool.query(queries.create_users, [user_id, user_name,hashedPwd, email, isAdmin], (error, results) => {
                if (error) {
                    console.log('error createNewUser',error);
                    return response.status(500).json(
                        returnMsgs.fnReturn500(error));
                }else{
                    console.log('create User success');
                    // create a row in user_fund_details
                    pool.query(queries.create_user_fund_details, [user_id, 0,0, 0, 0,0], (error, results) => {
                        if (error) {
                            console.log('error createNewUser || user_fund_details',error);
                            return response.status(500).json(
                                returnMsgs.fnReturn500(error));
                        }else{
                            console.log('createNewUser || user_fund_details success');
        
                            // create a row in user_fund_details
        
                            
                            response.status(201).json(returnMsgs.fnReturn200("User Created Successfully"))
                        }
                    })
                }
            })    
        } catch (err) {
            console.log('error createNewUser',err);
            response.status(500).json(returnMsgs.fnReturn500(err));
        }
    }
}
const updateUser =  (request, response) => {
    console.log('request.body',request.body);
    const { user_id, user_name, email,isAdmin,password } = request.body
    if (!user_id || !user_name || !email || isAdmin === null || isAdmin === "" || !password) {
        console.log('updateUser error', 'Missing data');
        return response.status(400).json(returnMsgs.fnReturn400());
    }else{
        pool.query(
            queries.update_user,[user_name, email, isAdmin,password, user_id],
            (error, results) => {
            if (error) {
                console.log('deleteUser error', error);
                return response.status(500).json(returnMsgs.fnReturn500(error));
            }else{
                console.log('updateUser success');
                response.status(201).json(returnMsgs.fnReturn200("User Deleted Successfully"))
            }
            }
        )
    }
}

const deleteUser = (request, response) => {
    const {user_id, user_name, email, isadmin}= request.query
    
    if (!user_id) {
        console.log('deleteUser error', 'Missing data');
        return response.status(400).json(returnMsgs.fnReturn400());
    }else{
        // fetch units
        pool.query(fundqueries.get_fund_details, (error, results) => {
            if (error) {
            console.log('error getFundNAV',error);
            return response.status(500).json(returnMsgs.fnReturn500(error));
        }else{
            let units_declared = 0 
            if(results.rows[0]?.units_declared){
                units_declared = results.rows[0].units_declared
            }else{
                console.log('error getFundNAV',error);
                return response.status(500).json(returnMsgs.fnReturn500("No Units Avaiablr"));
            }
            // get all units - held by user
            pool.query(queries.getByID_User_Fund_Details, [user_id], (error, results) => {
                if (error) {
                    console.log('getUserDetailsById error', error);
                    response.status(500).json(returnMsgs.fnReturn500(error));
                }else {       
                    let noOFUnits = units_declared - item.user_units
                    // update fund details units
                    pool.query(
                        fundqueries.edit_fund_QTY,
                        [noOFUnits, fund_id],
                        (error, results) => {
                        if (error) {
                            console.log('error : edit_fund_QTY');
                            return response.status(500).json({ "message": error });
                        }else{
                            console.log('edit_fund_QTY success');
                            // delete transactions
                            pool.query(queries.delete_user_transactions, [user_id], (error, results) => {
                                if (error) {
                                    console.log('deleteUser delete_user_fund_details error', error);
                                    response.status(500).json(returnMsgs.fnReturn500(error));
                                }
                                else{
                                    console.log('deleteUser delete_user_transactions success');
                                    // delete fund details
                                    pool.query(queries.delete_user_fund_details, [user_id], (error, results) => {
                                        if (error) {
                                            console.log('deleteUser delete_user_fund_details error', error);
                                            response.status(500).json(returnMsgs.fnReturn500(error));
                                        }
                                        else{
                                            console.log('deleteUser delete_user_fund_details success');
                                            // insert into deleted users
                                            pool.query(
                                                queries.insert_deleted_user,
                                                [user_id, user_name, email, isadmin],
                                                (error, results) => {
                                                if (error) {
                                                    console.log('error : edit_fund_QTY');
                                                    return response.status(500).json({ "message": error });
                                                }else{
                                                    // delete user
                                                    pool.query(queries.delete_user, [user_id], (error, results) => {
                                                        if (error) {
                                                            console.log('deleteUser error', error);
                                                            response.status(500).json(returnMsgs.fnReturn500(error));
                                                        }
                                                        else{
                                                            console.log('deleteUser success');
                                                            response.status(201).json(returnMsgs.fnReturn200("User Deleted Successfully"))
                                                        }
                                                    })
                                                }
                                                }
                                            )

                    
                    
                                        }
                                    })
                                }     
                            })
                        }
                        }
                    )
                }    
            })
        }     

        })
        // end
    }
}
// ###########################################







module.exports = {
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser
}