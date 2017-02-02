class InvalidArgumentError extends Error {

   readonly name = 'InvalidArgumentError'

   constructor(public readonly message: string = 'Invalid Argument Error') {
      super(message)
   }

}

export {InvalidArgumentError}
