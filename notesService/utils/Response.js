module.exports.response = (status, message, body, errorcode)=>{
    return  {
        status: status,
        message: message,
        body:body,
        errorcode: errorcode
    }
}