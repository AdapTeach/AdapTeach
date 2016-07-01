const app = require('../../server/server.js')

const api = require('co-supertest').agent(app.listen())

const cypher = require('../../server/repo/graph/cypher')

describe('API', () => {

  // it('clears DB before all tests', function *() {
  //   yield cypher.send('MATCH (n) DETACH DELETE n')
  // })

})

module.exports = api
