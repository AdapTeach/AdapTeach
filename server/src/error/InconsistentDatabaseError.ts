class InconsistentDatabaseError extends Error {

   readonly name = 'InconsistentDatabaseError'

   constructor(public readonly message: string = 'Inconsistent Database Error') {
      super(message)
   }

}

export {InconsistentDatabaseError}
