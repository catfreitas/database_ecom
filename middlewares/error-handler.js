/* const ErrorResponse = require('../utils/errorApi')

const errorHandler = (err, req, res, next) => {
    console.log("error HANDLER" + err);

    let error = {...err};

    error.message = err.message;

    if(err.name === "CastError"){
        const message = "Resource not found or invalid";
        error = new ErrorResponse(message, 404)

    }

    if(err.code == 11000){
        res.status(400).json({
            success: false,
            message: "Fields Duplicated"
        })
    }

    if(err.name === "ValidationError"){
        const message = Object.values(err.errors).map(error => {
            error.message
        }).join(" || ")

        error = new ErrorResponse(message, 400);
    }

    if(err.name === 'UnauthorizedError'){
        const message = "The user is not authorized!"
        error = new ErrorResponse(message, 401);
    }

    res.status(error.statusCode || 500).json({
        success: false, 
        error: error.message || "Something went wrong!"
    });
}

module.exports = errorHandler; */


function errorHandler(err, req, res, next){

    //JWT Validation
    if(err.name == 'UnauthorizedError'){
        return res.status(401).json({
            success: false,
            message: "The user is not authorized!",
            details: err.message
        });
    }

    //Duplicated Values
    if(err.code == 11000){
        return res.status(400).json({
            success: false,
            message: "Values Duplicated!",
            details: err.message
        })
    }

    //Validation Error
    if(err.name == 'ValidationError'){
       return res.status(401).json({
           success: false,
           message: "Some field was not correctly filled.",
           details: err.message
        });
    }

    if(err.name == 'NotFound'){
        return res.status(404).json({
            success: false,
            message: "Sorry, we can not found the page",
            message: err.message
        });
    }

    //Default error
    return res.status(500).json({
        success: false,
        message: "Something went wrong!",
        details: err.message
    });
}

module.exports = errorHandler;

/* module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
} */