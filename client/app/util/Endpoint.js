import axios from 'axios'

export const Endpoint = entityTypeName => {

  const post = entity => axios.post(`http://localhost:8000/api/${entityTypeName}`, entity)

  const get = id => axios.get(`http://localhost:8000/api/${entityTypeName}/${id}`)

  return {
    post,
    get
  }

}
