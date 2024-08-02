const errorMiddleware = (err, req, res, next) => {
    err.message ||= 'Internal server error'
    err.statusCode ||= 500

    return res.status(err.statusCode).json({
        success: true,
        message: err.message,
    })
}

export {errorMiddleware}