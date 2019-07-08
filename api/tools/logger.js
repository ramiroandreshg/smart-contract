// LOGGER ABSTRACTION 
// ToDo: replace it with morgan/winston/wathever

exports = module.exports = {};

exports.log = function (...message) {
  console.log(...message);
}

exports.info = function (...message) {
  console.info(...message);
}

exports.warn = function (...message) {
  console.warn(...message);
}

exports.error = function (...message) {
  console.error(...message);
}