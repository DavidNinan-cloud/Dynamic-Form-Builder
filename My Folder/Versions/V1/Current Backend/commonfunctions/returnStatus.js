
const fnReturn500 = (err) => {
    let obj = {
        "status" : 'Internal Server Error',
        "debugMessage" : '',
        "message": err.message,
        "statusCode":500 
    }
    return obj
}
const fnReturn400 = () => {
    let obj = {
        "status" : 'Missing Data',
        "debugMessage" : '',
        "message": '',
        "statusCode":400 
    }
    return obj
}
const fnReturn200 = (msg) => {
    let obj = {
        "status" : msg,
        "debugMessage" : '',
        "message": '',
        "statusCode":200 
    }
    return obj
}

module.exports = { 
    fnReturn500,
    fnReturn400,
    fnReturn200
}