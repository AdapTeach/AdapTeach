const api = require('./api')
const itemAPI = require('./itemAPI')

const create = function *(quiz) {
  if (!quiz) {
    const item = yield itemAPI.create()
    quiz = {
      question: 'Test Quiz ?',
      assessedItemIds: [item.uuid]
    }
  }
  const response = yield api.post('/api/quiz').send(quiz).expect(201).end()
  return response.body
}

const find = function *(uuid) {
  const response = yield api.get(`/api/quiz/${uuid}`).expect(200).end()
  return response.body
}

module.exports = {
  create,
  find
}
