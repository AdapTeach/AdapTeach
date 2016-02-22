const expect = require('chai').expect

const api = require('./util/api')
const itemAPI = require('./util/itemAPI')
const objectiveAPI = require('./util/objectiveAPI')

describe('Objective API', () => {

  it('finds Item by name', function *() {
    const item = yield itemAPI.create()
    const objectives = yield objectiveAPI.search(item.name)
    expect(objectives.items).to.contain(item)
  })

})
