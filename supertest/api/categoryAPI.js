const api = require('./api')

const create = function *(category) {
  if (!category) category = {name: 'Test Category'}
  const response = yield api.post('/api/category').send(category).expect(201).end()
  return response.body
}

const find = function *(uuid) {
  const response = yield api.get(`/api/category/${uuid}`).expect(200).end()
  return response.body
}

const list = function *() {
  const response = yield api.get(`/api/category/list`).expect(200).end()
  return response.body
}

const search = function *(query) {
  const response = yield api.get(`/api/category/search/${query}`).expect(200).end()
  return response.body
}

module.exports = {
  create,
  find,
  list,
  search
}
