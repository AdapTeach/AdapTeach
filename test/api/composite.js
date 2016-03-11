const expect = require('chai').expect

const api = require('./util/api')
const compositeAPI = require('./util/compositeAPI')
const itemAPI = require('./util/itemAPI')

describe('Composite API', () => {

  it('creates Composite when componentIds field array is missing', function *() {
    const composite = yield compositeAPI.create({
      name: 'Empty Composite',
      description: 'Whatever'
    })
    expect(composite.uuid).to.exist
  })

  it('prevents Composite creation when name is missing', function *() {
    const compositeFields = {
      description: 'This Composite is missing a name'
    }
    yield api.post('/api/composite').send(compositeFields).expect(400).end()
  })

  describe('when Composite with no components is created', () => {
    const compositeFields = {
      name: 'Empty Composite',
      description: 'Whatever',
      componentIds: []
    }
    var composite

    beforeEach(function *() {
      composite = yield compositeAPI.create(compositeFields)
    })

    it('returns created Composite', function *() {
      expect(composite.uuid).to.exist
      expect(composite.name).to.equal(compositeFields.name)
      expect(composite.description).to.equal(compositeFields.description)
    })

    it('finds Composite by ID', function *() {
      const found = yield compositeAPI.find(composite.uuid)
      expect(found).to.deep.equal(composite)
    })

  })

  describe('when Composite with single Item component is created', () => {
    var item
    var composite

    beforeEach(function *() {
      item = yield itemAPI.create()
      const compositeFields = {
        name: 'Composite with single Item component',
        componentIds: [item.uuid]
      }
      composite = yield compositeAPI.create(compositeFields)
    })

    it('returns Item in components', function *() {
      expect(composite.components.items).to.contain(item)
    })

    describe('when finding Composite by ID', () => {
      var found

      beforeEach(function *() {
        found = yield compositeAPI.find(composite.uuid)
      })

      it('returns Item in components', function *() {
        expect(composite.components.items.length).to.equal(1)
        expect(found.components.items).to.contain(item)
      })
    })

  })

  describe('when Composite with many Items components is created', () => {
    var item1
    var item2
    var composite

    beforeEach(function *() {
      item1 = yield itemAPI.create()
      item2 = yield itemAPI.create()
      const compositeFields = {
        name: 'Composite with many Items as objectives',
        componentIds: [item1.uuid, item2.uuid]
      }
      composite = yield compositeAPI.create(compositeFields)
    })

    it('returns Items in components', function *() {
      expect(composite.components.items.length).to.equal(2)
      expect(composite.components.items).to.contain(item1)
      expect(composite.components.items).to.contain(item2)
    })
  })

})
