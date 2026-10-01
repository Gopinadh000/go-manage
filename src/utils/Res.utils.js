

export const ReS = (res,{data ={}, status = true, statusCode = 200, statusMessage = "Success", ...rest} )=>{
    const response = {
        status,
        statusMessage,
        statusCode,
        data,
        ...rest
    }
    return res.status(statusCode).json(response);
};


export const ReE = (res, {status = false , statusCode = 500,  statusMessage = "Something Went Wrong", error ={}, ...rest} )=>{
    const response = {
        status,
        statusCode,
        statusMessage,
        error,
        ...rest
    }
    return res.status(statusCode).json(response);
}