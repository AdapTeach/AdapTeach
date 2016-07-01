const api = require('./api')

const find = function *(uuid) {
  const response = yield api.get(`/api/objective/${uuid}`).expect(200).end()
  return response.body
}

const search = function *(query) {
  const response = yield api.get(`/api/objective?name=${query}`).expect(200).end()
  return response.body
}

module.exports = {
  find,
  search
}
