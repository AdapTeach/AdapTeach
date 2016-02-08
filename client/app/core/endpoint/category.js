import axios from 'axios'

function create(category) {
  return axios.post(`http://localhost:8000/api/category`, category)
    .then(response => response.data)
    .catch(error => console.error(error))
}

export default {
  create
}
