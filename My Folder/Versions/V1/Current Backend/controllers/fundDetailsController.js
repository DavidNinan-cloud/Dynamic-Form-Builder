const queries = require('../queries/fund_queries')
const {pool} = require('../config/dbConn');
const { roundToTwo } = require('../commonfunctions/DataValidator');

// yes
const getFundDetails = (request, response) => {
    pool.query(queries.get_fund_details, (error, results) => {
      if (error) {
        console.log('error getFundDetails',error);
        return response.status(500).json(returnMsgs.fnReturn500(error));
    }else{
        let headers = [
            "Fund Id",
            "Fund Name",
            "Fund Commission",
            "Fund Expense_ratio",
            "Fund NAV",
            "Fund AUM",
            "Units Declared"]
            let finalResult = []
            for(let item of results.rows){
                let obj = {
                    "Fund Id": item.fund_id,
                    "Fund Name": item.fund_name,
                    "Fund Commission":roundToTwo(item.fund_commission) ,
                    "Fund Expense_ratio":roundToTwo(item.fund_expense_ratio) ,
                    "Fund NAV":roundToTwo(item.fund_nav) ,
                    "Fund AUM":roundToTwo(item.fund_aum) ,
                    "Units Declared": roundToTwo(item.units_declared)
                }
                finalResult.push(obj)
            }
          const structuredResult = {
              actions : ["Edit","Delete"],
              headers : headers,
              result : results.rows,
              count : results.rowCount,
              statusCode : 200
          }
          console.log('getAllUsers success');
          response.status(200).json(structuredResult)
    }     

    })
}
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
              result : roundToTwo(NavRate),
              statusCode : 200
          }
          console.log('getFundNAV success');
          response.status(200).json(structuredResult)
    }     

    })
}
// #######################################
const editFundDetails = (request, response) => {
    const { fund_name,fund_commission,  fund_expense_ratio, fund_nav, units_declared, fund_AUM, fund_id } = request.body
    if (!fund_name || !fund_commission || !fund_expense_ratio || !fund_nav ||!units_declared || !fund_AUM || !fund_id) {
        return response.status(400).json({ "message": `incomplete details` });
    }
    pool.query(
        queries.edit_fund_nav,
        [
            fund_name,
            fund_commission,
            fund_expense_ratio,
            fund_nav,
            fund_AUM,
            units_declared,
            fund_id
        ],
        (error, results) => {
        if (error) {
            return response.status(500).json({ "message": error });
        }else{
            console.log('updateUser success');
            response.status(201).send(`fund details updated `)
        }
        }
    )
}

const editFund_QTY = (request, response) => {
    const { units_declared, fund_AUM, fund_id } = request.body
    if (!units_declared || !fund_AUM || !fund_id) {
        return response.status(400).json({ "message": `incomplete details` });
    }
    pool.query(
        queries.edit_fund_QTY_AUM,
        [units_declared, fund_id],
        (error, results) => {
        if (error) {
            return response.status(500).json({ "message": error });
        }else{
            console.log('updateUser success');
            response.status(201).send(`fund qty & AUM updated `)
        }
        }
    )
}

module.exports = {
    getFundDetails,
    getFundNAV,
    editFundDetails,
    editFund_QTY_AUM,
    editFund_nav
}