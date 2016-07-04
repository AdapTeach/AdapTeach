const api = require('./api')

const addObjective = function *(objectiveId) {
  const response = yield api.put(`/api/loggedUser/objectives/${objectiveId}`)
    .send({})
    .expect(200)
    .end()
  return response.body
}

const findObjectives = function *() {
  const response = yield api.get('/api/loggedUser/objectives')
    .send()
    .expect(200)
    .end()
  return response.body
}

const removeObjective = function *(objectiveId) {
  const response = yield api.delete(`/api/loggedUser/objectives/${objectiveId}`)
    .send({})
    .expect(204)
    .end()
  return response.body
}

module.exports = {
  addObjective,
  findObjectives,
  removeObjective
}
