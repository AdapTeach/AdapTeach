import endpoint from './endpoint'

import {Repo} from 'util'

export const categoryRepo = Repo('category', endpoint)

export {categoryReducer} from './reducer'
