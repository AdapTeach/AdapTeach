import Endpoint from './endpoint'
import { ITEM } from '../core/data/entities'

class ItemEndpoint extends Endpoint {

  constructor() {
    super(ITEM)
  }

}

export default new ItemEndpoint()
