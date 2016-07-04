const expect = require('chai').expect

const itemAPI = require('./api/itemAPI')
const loggedUserAPI = require('./api/loggedUserAPI')

describe('Logged User API', () => {

  it('adds personal Objective', function *() {
    const item = yield itemAPI.create()
    const added = yield loggedUserAPI.addObjective(item.uuid)
    expect(added.uuid).to.equal(item.uuid)
  })

  it.only('returns empty array when no personal Objectives', function *() {
    const objectives = yield loggedUserAPI.findObjectives()
    // DELETE ALL PERSONAL OBJECTIVES
    const found = yield loggedUserAPI.findObjectives()
    expect(found).to.be.empty
  })

  it('finds personal Objectives', function *() {
    const item = yield itemAPI.create()
    yield loggedUserAPI.addObjective(item.uuid)

    const found = yield loggedUserAPI.findObjectives()
    const foundIds = found.map(o => o.uuid)
    expect(foundIds).to.contain(item.uuid)
  })

  it('removes personal Objective', function *() {
    const item = yield itemAPI.create()
    yield loggedUserAPI.addObjective(item.uuid)

    yield loggedUserAPI.removeObjective(item.uuid)
    const found = yield loggedUserAPI.findObjectives()
    const foundIds = found.map(o => o.uuid)
    expect(foundIds).not.to.contain(item.uuid)
  })
})
