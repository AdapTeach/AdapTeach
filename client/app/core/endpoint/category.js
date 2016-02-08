import axios from 'axios'

import store from '../../main/store'

function create(category) {
  return axios.post(`http://localhost:8000/api/category`, category)
    .then(response => response.data)
    .then(dispatchCategoryLoadedAction)
    .catch(error => console.error(error))
}

function load(id) {
  return axios.get(`http://localhost:8000/api/category/${id}`)
    .then(response => response.data)
    .then(dispatchCategoryLoadedAction)
    .catch(error => console.error(error))
}

function dispatchCategoryLoadedAction(category) {
  store.dispatch({
    type: 'CATEGORY_LOADED',
    payload: category
  })
  return category
}

export default {
  create,
  load
}
