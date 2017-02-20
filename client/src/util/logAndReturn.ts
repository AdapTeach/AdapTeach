import * as R from 'ramda'

const bindLog = R.bind(console.log, this.console)

const tapLog = R.tap(bindLog)

export const logAndReturn = tapLog
