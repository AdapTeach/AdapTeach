function InvalidArgumentError(message) {
  this.name = "InvalidArgumentError"
  this.message = message || "Message par défaut"
  this.stack = (new Error()).stack
}
InvalidArgumentError.prototype = Object.create(Error.prototype)
InvalidArgumentError.prototype.constructor = InvalidArgumentError

module.exports = InvalidArgumentError
