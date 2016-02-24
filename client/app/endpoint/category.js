import axios from 'axios'

import store from '../main/store'
import { CATEGORY } from '../core/data/entities'

import Endpoint from './endpoint'

class CategoryEndpoint extends Endpoint {

  constructor() {
    super(CATEGORY)
  }

}

export default new CategoryEndpoint()