const api = require('./api')

const categoryAPI = require('./categoryAPI')

function post() {
  return api.post('/api/item')
}

function *create(item) {
  if (!item) {
    item = {
      name: 'Test Item',
      description: 'Test Item Description'
    }
  }
  if (!item.categoryId) {
    const category = yield categoryAPI.create()
    item.categoryId = category.uuid
  }
  const response = yield post().send(item).expect(201).end()
  return response.body
}

function *find(uuid) {
  const response = yield api.get(`/api/item/${uuid}`).expect(200).end()
  return response.body
}

module.exports = {
  post,
  create,
  find
}
