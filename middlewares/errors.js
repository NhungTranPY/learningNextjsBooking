import ErrorHandler from '../utils/errorHandler';

// eslint-disable-next-line import/no-anonymous-default-export
export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    let error = { ...err } //spread the error

    error.message = err.message

    // wrong Mongoose Object Id Error
    if(err.name === 'CastError') {
        const message = `Resourse not found. Invalid: ${err.path}`;
        error = new ErrorHandler(message, 400);
    }

    // Handling mongoose Validtion error
    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message);
        error = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        error,
        message: error.message,
        stack: error.stack
    })
}