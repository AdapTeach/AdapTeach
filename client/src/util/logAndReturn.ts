import * as R from 'ramda'

const bindLog = R.bind(console.log, (console as any))

const tapLog = R.tap(bindLog)

export const logAndReturn = tapLog
