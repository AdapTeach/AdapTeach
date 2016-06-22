import axios from 'axios'

export const Endpoint = entityTypeName => {

  const post = entity => axios.post(`http://localhost:8000/api/${entityTypeName}`, entity)

  const get = id => axios.get(`http://localhost:8000/api/${entityTypeName}/${id}`)

  const search = params => axios.get(`http://localhost:8000/api/${entityTypeName}`, {params})

  return {
    post,
    get,
    search
  }

}
