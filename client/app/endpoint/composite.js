import Endpoint from './endpoint'
import { COMPOSITE } from '../core/data/entities'

class CompositeEndpoint extends Endpoint {

  constructor() {
    super(COMPOSITE)
  }

}

export default new CompositeEndpoint()
