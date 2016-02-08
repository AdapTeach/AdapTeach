import store from '../../main/store'
import categoryEndpoint from '../endpoint/category'

function data() {
  return store.getState().app.get('data').get('categories')
}

function get(id) {
  const category = data().get(id)
  if (!category) categoryEndpoint.load(id)
  return category
}

export default {
  get
}
