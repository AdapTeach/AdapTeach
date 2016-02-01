const api = require('./api');

const categoryAPI = require('./categoryAPI');

const create = function *(item) {
  if (!item) {
    item = {
      name: 'Test Item',
      description: 'Test Item Description'
    }
  }
  if (!item.categoryId) {
    const category = yield categoryAPI.create();
    item.categoryId = category.uuid
  }
  const response = yield api.post('/api/item').send(item).expect(201).end();
  return response.body
};

const find = function *(uuid) {
  const response = yield api.get('/api/item/' + uuid).expect(200).end();
  return response.body
};

module.exports = {
  create,
  find
};
