import Endpoint from './endpoint'
import { CATEGORY } from '../core/data/entities'

class CategoryEndpoint extends Endpoint {

  constructor() {
    super(CATEGORY)
  }

}

export default new CategoryEndpoint()
