const app = require('../../../server/server.js')

module.exports = require('co-supertest').agent(app.listen())
