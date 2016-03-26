import {history} from './history'

export const router = {

  goTo(path) {
    history.push(path)
  }

}
