const ErrorHandler = require('../utils/errorhandler');
const error = require('../utils/errorhandler');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';
  //Wrong Mongodb error
  if (err.name === 'CastError') {
    const message = `Resouce not Found. Invalid:${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  // Mongoose duplicate error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  // Wrong JWT error
  if(err.name==="JsonWebTokenWebError"){
    const message = `Json Web Token is invalid, try again`;
    err  = new ErrorHandler(message,400)
  }
  // JWT Expire Error
  if(err.name==="TokenExpiredError"){
    const message = `Json Web Token is expire, try again`;
    err  = new ErrorHandler(message,400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};
