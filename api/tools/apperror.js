// centralized error object that derives from Node’s Error
function AppError(message, name, httpCode) {
  Error.call(this);
  Error.captureStackTrace(this);
  this.message = message,
  this.name = name;
  this.httpCode = httpCode;
};

AppError.prototype.__proto__ = Error.prototype;

module.exports = AppError;

/*
ToDo: 
- Create enums for common Names and commons HttpCodeErrors
- isOperational
*/