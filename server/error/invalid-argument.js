function InvalidArgumentError(message) {
  this.name = "InvalidArgumentError"
  this.message = message || "Invalid Argument Error"
  this.stack = (new Error()).stack
}
InvalidArgumentError.prototype = Object.create(Error.prototype)
InvalidArgumentError.prototype.constructor = InvalidArgumentError

module.exports = InvalidArgumentError
