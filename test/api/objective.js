const expect = require('chai').expect

const itemAPI = require('./util/itemAPI')
const compositeAPI = require('./util/compositeAPI')
const objectiveAPI = require('./util/objectiveAPI')

describe('Objective API', () => {

  describe('when finding Item by name', () => {
    var item
    var searchResult
    var foundItems
    var foundItemIds

    beforeEach(function *() {
      item = yield itemAPI.create()
      searchResult = yield objectiveAPI.search(item.name)
      foundItems = searchResult.items
      foundItemIds = foundItems.map(i => i.uuid)
    })

    it('finds Item by name', function *() {
      expect(foundItemIds).to.contain(item.uuid)
    })

    it('returns Category', function *() {
      expect(foundItems).to.contain(item)
    })

  })

  describe('when finding Composite by name', () => {
    var composite
    var searchResult
    var foundComposites
    var foundCompositeIds

    beforeEach(function *() {
      composite = yield compositeAPI.create()
      searchResult = yield objectiveAPI.search(composite.name)
      foundComposites = searchResult.composites
      foundCompositeIds = foundComposites.map(c => c.uuid)
    })

    it('finds Item by name', function *() {
      expect(foundCompositeIds).to.contain(composite.uuid)
    })

  })

})
