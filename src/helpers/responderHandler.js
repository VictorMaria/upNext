const responseHandler =  {
    successResponse: (res, statusCode, data, message) => {
        return res.status(statusCode).json({
            status: 'success',
            message,
            data,
        });
    },
      
    errorResponse: (res, statusCode, message, data = undefined) => {
        return res.status(statusCode).json({
            status: 'failed',  
            message,
            data
        });
    },
};

export default responseHandler;