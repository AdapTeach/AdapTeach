import axios from 'axios'

import store from '../main/store'
import { ITEM } from '../core/data/entities'

import Endpoint from './endpoint'

class ItemEndpoint extends Endpoint {

  constructor() {
    super(ITEM)
  }

}

export default new ItemEndpoint()
