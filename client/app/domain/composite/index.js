import endpoint from './endpoint'

import {Repo} from 'util'

export const compositeRepo = Repo('composite', endpoint)

export {compositeReducer} from './reducer'
