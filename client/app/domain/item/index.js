import endpoint from './endpoint'

import {Repo} from 'util'

export const itemRepo = Repo('item', endpoint)

export {itemReducer} from './reducer'
