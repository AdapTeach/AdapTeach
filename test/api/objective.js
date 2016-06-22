const expect = require('chai').expect

const itemAPI = require('./util/itemAPI')
const compositeAPI = require('./util/compositeAPI')
const objectiveAPI = require('./util/objectiveAPI')

describe('Objective API', () => {

  describe('for existing Item', () => {
    var item

    beforeEach(function *() {
      item = yield itemAPI.create()
    })

    it('finds Item by uuid', function *() {
      const found = yield objectiveAPI.find(item.uuid)
      expect(found.uuid).to.equal(item.uuid)
    });

    it('finds Item by name', function *() {
      const result = yield objectiveAPI.search(item.name)
      const foundItemIds = result.items.map(i => i.uuid)
      expect(foundItemIds).to.contain(item.uuid)
    })

  })

  describe('when finding Composite by name', () => {
    var composite

    beforeEach(function *() {
      composite = yield compositeAPI.create()

    })

    it('finds Composite by uuid', function*() {
      const found = yield objectiveAPI.find(composite.uuid)
      expect(found.uuid).to.equal(composite.uuid)
    });

    it('finds Composite by name', function *() {
      const searchResult = yield objectiveAPI.search(composite.name)
      const foundCompositeIds = searchResult.composites.map(c => c.uuid)
      expect(foundCompositeIds).to.contain(composite.uuid)
    })

  })

})
