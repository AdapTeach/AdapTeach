const api = require('./api')

const search = function *(query) {
  const response = yield api.get(`/api/objective/search/${query}`).expect(200).end()
  return response.body
}

module.exports = {
  search
}
