const queries = require('../queries/employees')
const {pool} = require('../config/dbConn')
const { v4 : uuidv4} = require('uuid')

const getAllEmployees = (request, response) => {
    pool.query(queries.getEmployees, (error, results) => {
      if (error) {
        response.status(500).json({message:'Internal Server Error'});
      }
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
      console.log('getAllEmployees success');
      response.status(200).json(structuredResult)
    })
}
  
const getEmployeeById = (request, response) => {
    const id = parseInt(request.params.id)
    if (!request?.params?.id) {
        response.status(400).json({ 'message': 'Missing Employee id' });
    }
    else{

        pool.query(queries.getEmployeeById, [id], (error, results) => {
            if (error) {
                response.status(400).json({ "message": `Employee ID ${request.params.id} not found` });
            }
            if(!results.rows.length){
                response.status(400).json({ "message": `Employee ID ${request.body.id} not found` });
            }else {
                response.status(200).json(results.rows)
                console.log('getEmployeeById success');
            }    
        })
    }
}


const createNewEmployee = (request, response) => {
    const { firstname, lastname } = request.body
    const id = uuidv4()
    // check if user exists 

    // 
    if (!firstname || !lastname) {
        return response.status(400).json({ "message": `First and last names are required` });
    }
    pool.query(queries.createEmployee, [id, firstname, lastname], (error, results) => {
        if (error) {
            console.log('error',error);
            return response.status(500).json({ "message": error });
        }
        console.log('createNewEmployee success');
        response.status(201).send(`Employee added with ID: ${id}`)
    })
}

const updateEmployee = (request, response) => {
    // const id = parseInt(request.params.id)
    const { id, firstname, lastname } = request.body
    if (!id || !firstname || !lastname) {
        return response.status(400).json({ "message": `incomplete details` });
    }
    pool.query(
        queries.updateEmployee,
        [firstname, lastname, id],
        (error, results) => {
        if (error) {
            return response.status(500).json({ "message": error });
        }else{
            console.log('createNewEmployee success');
            response.status(201).send(`Employee modified with ID: ${id}`)
        }
        }
    )
}

const deleteEmployee = (request, response) => {
    const id = parseInt(request.params.id)
    if (!id) {
        return response.status(400).json({ 'message': 'Missing Employee id' });
    }
    pool.query(queries.deleteEmployee, [id], (error, results) => {
        if (error) {
            response.status(500).json({message:'Internal Server Error'});
        }
        response.status(200).send(`Employee deleted with ID: ${id}`)
    })
}


module.exports = {
    getAllEmployees,
    getEmployeeById,
    createNewEmployee,
    updateEmployee,
    deleteEmployee
}

