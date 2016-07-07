const expect = require('expect')
const stub = require('./stub.data')
const compositeRepo = require('./composite')
const InvalidArgumentError = require('../error/invalid-argument')

describe('Composite API', () => {

  it('creates Composite when componentIds field array is missing', function *() {
    const composite = yield compositeRepo.create({
      name: 'Empty Composite',
      description: 'Whatever'
    })
    expect(composite.uuid).toExist()
  })

  it('prevents Composite creation when name is missing', function *() {
    const compositeWithoutName = {
      description: 'Whatever'
    }
    try {
      yield compositeRepo.create(compositeWithoutName)
      throw Error('Should throw !')
    } catch (error) {
      expect(error).toBeA(InvalidArgumentError)
    }
  })

  describe('when Composite with no components is created', () => {
    const compositeFields = {
      name: 'Empty Composite',
      description: 'Whatever',
      componentIds: []
    }
    var composite

    beforeEach(function *() {
      composite = yield compositeRepo.create(compositeFields)
    })

    it('returns created Composite', function *() {
      expect(composite.uuid).toExist()
      expect(composite.name).toEqual(compositeFields.name)
      expect(composite.description).toEqual(compositeFields.description)
    })

    it('finds Composite by ID', function *() {
      const found = yield compositeRepo.find(composite.uuid)
      expect(found).toEqual(composite)
    })

  })

  describe('when Composite with single Item component is created', () => {
    var item
    var composite

    beforeEach(function *() {
      item = yield stub.item()
      const compositeFields = {
        name: 'Composite with single Item component',
        componentIds: [item.uuid]
      }
      composite = yield compositeRepo.create(compositeFields)
    })

    it('returns Item in components', function *() {
      const itemIds = composite.components.items.map(item => item.uuid)
      expect(itemIds.length).toEqual(1)
      expect(itemIds).toInclude(item.uuid)
    })

    describe('when finding Composite by ID', () => {
      var found

      beforeEach(function *() {
        found = yield compositeRepo.find(composite.uuid)
      })

      it('returns Item in components', function *() {
        const itemIds = found.components.items.map(item => item.uuid)
        expect(itemIds.length).toEqual(1)
        expect(itemIds).toInclude(item.uuid)
      })
    })

  })

  describe('when Composite with many Items components is created', () => {
    var item1
    var item2
    var composite

    beforeEach(function *() {
      item1 = yield stub.item()
      item2 = yield stub.item()
      const compositeFields = {
        name: 'Composite with many Items as objectives',
        componentIds: [item1.uuid, item2.uuid]
      }
      composite = yield compositeRepo.create(compositeFields)
    })

    it('returns Items in components', function *() {
      expect(composite.components.items.length).toEqual(2)
      expect(composite.components.items).toInclude(item1)
      expect(composite.components.items).toInclude(item2)
    })
  })

})
