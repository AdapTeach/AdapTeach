import axios from 'axios'

import store from '../../main/store'

function create(item) {
  return axios.post(`http://localhost:8000/api/item`, item)
    .then(response => response.data)
    .catch(error => console.error(error))
}

export default {
  create
}
