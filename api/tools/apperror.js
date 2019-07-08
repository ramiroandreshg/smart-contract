// centralized error object that derives from Node’s Error
function AppError(publicMsg, internalMsg, name, httpCode) {
  Error.call(this);
  Error.captureStackTrace(this);
  this.publicMsg = publicMsg,
  this.internalMsg = internalMsg,
  this.name = name;
  this.httpCode = httpCode;
};

AppError.prototype.__proto__ = Error.prototype;

AppError.prototype.getMessage = function () {
  return {
    error: this.httpCode + '- ' + this.name + ': ' + this.publicMsg
  }
};

module.exports = AppError;

/*
ToDo: 
- Create enums for common Names and commons HttpCodeErrors
- flag: isOperational
*/