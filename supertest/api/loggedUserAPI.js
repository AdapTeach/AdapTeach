const api = require('./api')

const addObjective = function *(objective) {
  const response = yield api.put(`/api/loggedUser/objectives/${objective.uuid}`)
    .send({})
    .expect(200)
    .end()
  return response.body
}

module.exports = {
  addObjective
}
