const queries = require('../queries/all_queries')
const {pool} = require('../config/dbConn')
const { v4 : uuidv4} = require('uuid')
const bcrypt = require('bcrypt');
const returnMsgs = require('../commonfunctions/returnStatus')
const {roundToTwo, setdateFormat} = require('../commonfunctions/DataValidator')

// Api 1 : Get All Users with details
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
            'Invested',
            'Commission',
            'Expense',
            'Taxes',
            'Units']

        let finalResult = []
        for(let item of results.rows){
          let obj = {
                user_id: item.user_id,
                'User Name': item.user_name,
                'Email': item.email,
                'Is Admin': item.isadmin,
                'Invested' : roundToTwo(item.user_invested),
                'Commission': roundToTwo(item.user_commission),
                'Expense' : roundToTwo(item.user_expense),
                'Taxes' : roundToTwo(item.user_taxes),
                'Units' : roundToTwo(item.user_units)
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

// Api 2 : Get User by ID
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
                    'Invested', 
                    'Commission',
                    'Expense',
                    'Taxes',
                    'Units']
        
                let finalResult = []
                for(let item of results.rows){
                  let obj = {
                        user_id: item.user_id,
                        'Invested' : roundToTwo(item.user_invested),
                        'Commission': roundToTwo(item.user_commission),
                        'Expense' : roundToTwo(item.user_expense),
                        'Taxes' : roundToTwo(item.user_taxes),
                        'Units' : roundToTwo(item.user_units)
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

// API 3 : Create User
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
        
                            
                            response.status(201).json(returnMsgs.fnReturn200(`User Created Successfully with id : ${user_id}`))
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

// API 4: Edit User
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
                console.log('updateUser error', error);
                return response.status(500).json(returnMsgs.fnReturn500(error));
            }else{
                console.log('updateUser success',);
                response.status(201).json(returnMsgs.fnReturn200("User Edited Successfully"))
            }
            }
        )
    }
}

// API 5: Delete User
const deleteUser = (request, response) => {
    const {user_id,user_units, user_name, email, isadmin}= request.query
    
    if (!user_id) {
        console.log('deleteUser error', 'Missing data');
        return response.status(400).json(returnMsgs.fnReturn400());
    }else{
        // update fund details units
        let fund_id = 1
        pool.query(queries.edit_fund_QTY_Auto_Substract,[user_units, fund_id],
            (error, results) => {
            if (error) {
                console.log('error : edit_fund_QTY',error);
                return response.status(500).json({ "message": error });
            }else{
                console.log('edit_fund_QTY success');
                // delete transactions
                pool.query(queries.delete_user_transactions, [user_id], (error, results) => {
                    if (error) {
                        console.log('deleteUser delete_user_transactions error', error);
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
                                        console.log('insert_deleted_user success');
                                        pool.query(queries.delete_user, [user_id], (error, results) => {
                                            if (error) {
                                                console.log('deleteUser error', error);
                                                response.status(500).json(returnMsgs.fnReturn500(error));
                                            }
                                            else{
                                                console.log('deleteUser success',results);
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
        // end
    }
}

// Api 6 : FUND NAV History
const getNAVHistroy = (request, response) => {
    pool.query(queries.get_fund_nav, (error, results) => {
      if (error) {
        console.log('error getNAVHistroy',error);
        return response.status(500).json(returnMsgs.fnReturn500(error));
      }      
      let arr = []
      for (let item of results.rows){
        let obj = {
            "Rate": roundToTwo(item.nav_rate),
            "Date": setdateFormat(item.date)
        }
        arr.push(obj)
      }
      const structuredResult = {
          result : arr,
          count : results.rowCount,
          statusCode : 200
      }
      console.log('getAllUsers success');
      response.status(200).json(structuredResult)
    })
}

// Api 7: ADD Fund NAV Rate
const addNAV = (request, response) => {
    const { nav_rate, date, fund_id } = request.body

    if (!nav_rate || !date ||!fund_id ) {
        console.log('error addNAV : Data missing');
        return response.status(400).json(returnMsgs.fnReturn400());
    }
    pool.query(queries.add_nav, [nav_rate, date, fund_id], (error, results) => {
        if (error) {                    
            console.log('error addNAV',error);
            return response.status(500).json(returnMsgs.fnReturn500(error));
        }else{
            console.log('addNAV success');      
            pool.query(
                queries.edit_fund_nav,
                [nav_rate,  fund_id],
                (error, results) => {
                if (error) {
                    console.log('error addNAV fund details',error);
                    return response.status(500).json(returnMsgs.fnReturn500(error));
                }else{
                    console.log('addNAV fund details success');
                    response.status(201).json(returnMsgs.fnReturn200("NAV Added Successfully"))
                }
                }
            )      
        }
    })
}

// Api 8 : FUND Details
const getFundDetails = (request, response) => {
    pool.query(queries.get_fund_details, (error, results) => {
      if (error) {
        console.log('error getFundDetails',error);
        return response.status(500).json(returnMsgs.fnReturn500(error));
    }else{
        let headers = [
            "fund_id",
            "Fund Name",
            "Commission",
            "Expense_ratio",
            "NAV",
            "AUM",
            "Units Declared"]
            let finalResult = []
            for(let item of results.rows){
                let obj = {
                    "fund_id": item.fund_id,
                    "Fund Name": item.fund_name,
                    "Commission":roundToTwo(item.fund_commission) ,
                    "Expense_ratio":roundToTwo(item.fund_expense_ratio) ,
                    "NAV":roundToTwo(item.fund_nav) ,
                    "AUM":roundToTwo(Number(item.fund_nav)*Number(item.units_declared)) ,
                    "Units Declared": roundToTwo(item.units_declared)
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

// Api 9: Fund NAV Rate
const getFundNAV = (request, response) => {
    pool.query(queries.get_fund_details, (error, results) => {
      if (error) {
        console.log('error getFundNAV',error);
        return response.status(500).json(returnMsgs.fnReturn500(error));
    }else{

        let NavRate = 0 
        if(results.rows[0]?.fund_nav){
            NavRate = results.rows[0].fund_nav
        }
          const structuredResult = {
              navRate : NavRate,
              statusCode : 200
          }
          console.log('getFundNAV success');
          response.status(200).json(structuredResult)
    }     

    })
}

// Api 10: Get User Transactions by ID
const getUserTransactionById = (request, response) => {
    const user_id = request.query.user_id
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
                let headers = [
                    "user_id",
                    "transactions_id",
                    "Date",
                    "Credited",
                    "@NAV",
                    "Units"
                ]
                let arr = []
                for (let item of results.rows){
                    let obj = {
                        "user_id":item.user_id,
                        "transactions_id":item.transactions_id,
                        "Date":item.date,
                        "Credited":item.credited,
                        "@NAV":item.at_nav,
                        "Units":item.units
                    }
                    arr.push(obj)
                }
                
                const structuredResult = {
                    actions : ["Edit","Delete"],
                    headers : headers,
                    result : arr,
                    count : results.rowCount,
                    statusCode : 200
                }
                console.log('getUserTransactionById success',results.rows);
                response.status(200).json(structuredResult)
            }    
        })
    }
}

// API 11. New Transaction 
const createNewUserTransaction = (request, response) => {   
    const { user_id, date, credited, at_nav, units} = request.body
    // check if user exists 

    // 
    if (!user_id || !date ||credited === null || credited === "" || !at_nav || !units) {
        console.log('error createNewUserTransaction : Data missing');
        return response.status(400).json(returnMsgs.fnReturn400());
    }else{
        pool.query(queries.create_user_transaction, [user_id, date, credited, at_nav, units], (error, results) => {
            if (error) {
                console.log('error create_user_transaction',error);
                return response.status(500).json(
                    returnMsgs.fnReturn500(error));
            }else{
                let noUnits = Number(units)
                let fund_id = 1
                console.log('createNewUserTransaction success');
                    // update user_details & fund_details;
                    // 2,update user units : update_user_units
                    if(credited){
                        pool.query(queries.update_user_units_Auto_ADD,[noUnits,user_id],
                            (error, results) => {
                            if (error) {
                                console.log('update_user_units error', error);
                                return response.status(500).json(returnMsgs.fnReturn500(error));
                            }else{
                                console.log('update_user_units success');
                            
                               // 3,update fund units : edit_fund_QTY
                               pool.query(queries.edit_fund_QTY_Auto_ADD,[noUnits,fund_id],
                                (error, results) => {
                                if (error) {
                                    console.log('edit_fund_QTY error', error);
                                    return response.status(500).json(returnMsgs.fnReturn500(error));
                                }else{
                                // 5,return successful
                                response.status(201).json(returnMsgs.fnReturn200("Transaction Added Successfully"))
                                
                            }})
                            }
                            }
                        )
                    }else{
                        pool.query(queries.update_user_units_Auto_Substract,[noUnits,user_id],
                            (error, results) => {
                            if (error) {
                                console.log('update_user_units error', error);
                                return response.status(500).json(returnMsgs.fnReturn500(error));
                            }else{
                                console.log('update_user_units success');
                            
                                    // 4,update fund units : edit_fund_QTY
                                    pool.query(queries.edit_fund_QTY_Auto_Substract,[noUnits,fund_id],
                                        (error, results) => {
                                        if (error) {
                                            console.log('edit_fund_QTY error', error);
                                            return response.status(500).json(returnMsgs.fnReturn500(error));
                                        }else{
                                        // 5,return successful
                                        response.status(201).json(returnMsgs.fnReturn200("Transaction Added Successfully"))
                                        
                                    }})
                            }
                            }
                        )
                    }
                    
                   
            }

        })
    }
}

// API 12. Delete Transaction :
const deleteUserTransaction = (request, response) => {
    
    const {transaction_id}= request.query
    if (!transaction_id) {
        console.log('deleteUserTransaction error', 'Missing data');
        return response.status(400).json(returnMsgs.fnReturn400());
    }else{    
        pool.query(queries.delete_user_transaction, [transaction_id], (error, results) => {
            if (error) {
                console.log('error : delete_user_transaction',error);
                return response.status(500).json({ "message": error });
            }else{
                // console.log('results',results.rows[0]);
                if(results.rows[0]){
                    let fund_id = 1
                    let user_id = results.rows[0].user_id
                    let noUnits = Number(results.rows[0].units)
                    let credited = results.rows[0].credited
                    if(credited){
                        pool.query(queries.update_user_units_Auto_ADD,[noUnits,user_id],
                            (error, results) => {
                            if (error) {
                                console.log('update_user_units error', error);
                                return response.status(500).json(returnMsgs.fnReturn500(error));
                            }else{
                                console.log('update_user_units success');
                            
                            // 3,update fund units : edit_fund_QTY
                            pool.query(queries.edit_fund_QTY_Auto_ADD,[noUnits,fund_id],
                                (error, results) => {
                                if (error) {
                                    console.log('edit_fund_QTY error', error);
                                    return response.status(500).json(returnMsgs.fnReturn500(error));
                                }else{
                                // 5,return successful
                                response.status(201).json(returnMsgs.fnReturn200("Transaction Deleted Successfully"))
                                
                            }})
                            }
                            }
                        )
                    }else{
                        pool.query(queries.update_user_units_Auto_Substract,[noUnits,user_id],
                            (error, results) => {
                            if (error) {
                                console.log('update_user_units error', error);
                                return response.status(500).json(returnMsgs.fnReturn500(error));
                            }else{
                                console.log('update_user_units success');
                            
                                    // 4,update fund units : edit_fund_QTY
                                    pool.query(queries.edit_fund_QTY_Auto_Substract,[noUnits,fund_id],
                                        (error, results) => {
                                        if (error) {
                                            console.log('edit_fund_QTY error', error);
                                            return response.status(500).json(returnMsgs.fnReturn500(error));
                                        }else{
                                        // 5,return successful
                                        response.status(201).json(returnMsgs.fnReturn200("Transaction Deleted Successfully"))
                                        
                                    }})
                            }
                            }
                        )
                    }
                }else{
                    console.log('error : delete_user_transaction not found',error);
                                        response.status(201).json(returnMsgs.fnReturn200("Transaction Deleted Successfully"))

                }
                // remove form user fund details

                // pool.query(queries.update_user_units_Auto_Substract,[noUnits,user_id],
                //     (error, results) => {
                //     if (error) {
                //         console.log('update_user_units error', error);
                //         return response.status(500).json(returnMsgs.fnReturn500(error));
                //     }else{
                //         console.log('update_user_units success');
                    
                //             // 4,update fund units : edit_fund_QTY
                //             pool.query(queries.edit_fund_QTY_Auto_Substract,[noUnits,fund_id],
                //                 (error, results) => {
                //                 if (error) {
                //                     console.log('edit_fund_QTY error', error);
                //                     return response.status(500).json(returnMsgs.fnReturn500(error));
                //                 }else{
                //                 // 5,return successful
                //                 response.status(201).json(returnMsgs.fnReturn200("Transaction Added Successfully"))
                                
                //             }})
                //     }
                //     }
                // )

                // remove form fund details
            }
        })
    }
}

// API 13. Update Transaction :
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
            console.log('update_user_transaction error',error);
            return response.status(500).json({ "message": error });
        }else{
            console.log('prev transaction',results.rows[0]);
            let prevCredited = results.rows[0].credited
            let user_id = results.rows[0].user_id
            let fund_id = 1
            let prevUnits = Number(results.rows[0].units)
            console.log('prevUnits',prevUnits);
            let noUnits = Number(prevUnits) - units
            console.log('noUnits',noUnits);
            if(!prevCredited){
                console.log('prevCredited false');
                pool.query(queries.update_user_units_Auto_ADD,[noUnits,user_id],
                    (error, results) => {
                    if (error) {
                        console.log('update_user_units error', error);
                        return response.status(500).json(returnMsgs.fnReturn500(error));
                    }else{
                        console.log('update_user_units success');
                    
                    // 3,update fund units : edit_fund_QTY
                    pool.query(queries.edit_fund_QTY_Auto_ADD,[noUnits,fund_id],
                        (error, results) => {
                        if (error) {
                            console.log('edit_fund_QTY error', error);
                            return response.status(500).json(returnMsgs.fnReturn500(error));
                        }else{
                        // 5,return successful
                        response.status(201).json(returnMsgs.fnReturn200("Transaction Updated Successfully"))
                        
                    }})
                    }
                    }
                )
            }else{
                console.log('prevCredited true');
                pool.query(queries.update_user_units_Auto_Substract,[noUnits,user_id],
                    (error, results) => {
                    if (error) {
                        console.log('update_user_units error', error);
                        return response.status(500).json(returnMsgs.fnReturn500(error));
                    }else{
                        console.log('update_user_units success');
                    
                            // 4,update fund units : edit_fund_QTY
                            pool.query(queries.edit_fund_QTY_Auto_Substract,[noUnits,fund_id],
                                (error, results) => {
                                if (error) {
                                    console.log('edit_fund_QTY error', error);
                                    return response.status(500).json(returnMsgs.fnReturn500(error));
                                }else{
                                    console.log('edit_fund_QTY_Auto_Substract success');
                                // 5,return successful
                                    console.log('updateUserTransaction success');
                                response.status(201).json(returnMsgs.fnReturn200("Transaction Updated Successfully"))
                                
                            }})
                    }
                    }
                )
            }

        }
        }
    )
}

module.exports = {
    getAllUsers,
    getUserDetailsById,
    createNewUser,
    updateUser,
    deleteUser,
    getNAVHistroy,
    addNAV,
    getFundDetails,
    getFundNAV,
    getUserTransactionById,
    createNewUserTransaction,
    deleteUserTransaction,
    updateUserTransaction
}