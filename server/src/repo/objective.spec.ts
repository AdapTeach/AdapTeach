import * as expect from 'expect'
const stub = require('./stub.data')
const objectiveRepo = require('./objective')

describe('Objective API', () => {

  describe('for existing Item', () => {
    var item

    beforeEach(function *() {
      item = yield stub.item()
    })

    it('finds Item by uuid', function *() {
      const found = yield objectiveRepo.find(item.uuid)
      expect(found.uuid).toEqual(item.uuid)
    });

    it('finds Item by name', function *() {
      const result = yield objectiveRepo.search(item.name)
      const foundItemIds = result.items.map(i => i.uuid)
      expect(foundItemIds).toInclude(item.uuid)
    })

  })

  describe('when finding Composite by name', () => {
    var composite

    beforeEach(function *() {
      composite = yield stub.composite()
    })

    it('finds Composite by uuid', function*() {
      const found = yield objectiveRepo.find(composite.uuid)
      expect(found.uuid).toEqual(composite.uuid)
    });

    it('finds Composite by name', function *() {
      const searchResult = yield objectiveRepo.search(composite.name)
      const foundCompositeIds = searchResult.composites.map(c => c.uuid)
      expect(foundCompositeIds).toInclude(composite.uuid)
    })

  })

})
