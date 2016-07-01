const expect = require('chai').expect

const itemAPI = require('./api/itemAPI')
const loggedUserAPI = require('./api/loggedUserAPI')

describe('Logged User API', () => {

  it('adds personal Objective', function *() {
    const item = yield itemAPI.create()
    const added = yield loggedUserAPI.addObjective(item)
    expect(added.uuid).to.equal(item.uuid)
  })

})
