function InconsistentDatabaseError(message) {
  this.name = "InconsistentDatabaseError"
  this.message = message || "Inconsistent Database Error"
  this.stack = (new Error()).stack
}
InconsistentDatabaseError.prototype = Object.create(Error.prototype)
InconsistentDatabaseError.prototype.constructor = InconsistentDatabaseError

module.exports = InconsistentDatabaseError
