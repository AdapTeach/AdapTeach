import axios from 'axios'

import store from '../../main/store'

import Endpoint from './endpoint'

class CategoryEndpoint extends Endpoint {

  constructor() {
    super('category')
  }

}

export default new CategoryEndpoint()
