const api = require('./api')
const itemAPI = require('./itemAPI')

const create = function *(quiz) {
  if (!quiz) {
    const item = yield itemAPI.create()
    quiz = {
      assessedItemIds: [item.uuid],
      prerequisiteIds: [],
      activelyRecalledItemIds: [],
      passivelyRecalledItemIds: [],
      question: 'Test Question ?',
      answers: [
        {text: 'Yes', correct: true},
        {text: 'No', correct: false}
      ]
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
