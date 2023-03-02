const queries = require('../queries/fund_queries')
const {pool} = require('../config/dbConn')
const returnMsgs = require('../commonfunctions/returnStatus')


// yes
const getNAVHistroy = (request, response) => {
    pool.query(queries.get_fund_nav, (error, results) => {
      if (error) {
        console.log('error getNAVHistroy',error);
        return response.status(500).json(returnMsgs.fnReturn500(error));
      }      

      const structuredResult = {
          result : results.rows,
          count : results.rowCount,
          statusCode : 200
      }
      console.log('getAllUsers success');
      response.status(200).json(structuredResult)
    })
}
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
            // pool.query(
            //     queries.edit_fund_nav,
            //     [nav_rate,  fund_id],
            //     (error, results) => {
            //     if (error) {
            //         console.log('error addNAV fund details',error);
            //         return response.status(500).json(returnMsgs.fnReturn500(error));
            //     }else{
                    console.log('addNAV fund details success');
                    response.status(201).json(returnMsgs.fnReturn200("NAV Added Successfully"))
            //     }
            //     }
            // )      
        }
    })
}
// #############
module.exports = {
    getNAVHistroy,
    addNAV
}