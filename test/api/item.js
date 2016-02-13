const expect = require('chai').expect

const itemAPI = require('./util/itemAPI')

describe('Item API', () => {

  it('creates Item', function *() {
    const item = {
      name: 'Item to create',
      description: 'Whatever'
    }
    const createdItem = yield itemAPI.create(item)
    expect(createdItem.uuid).to.exist
    expect(createdItem.name).to.equal(item.name)
    expect(createdItem.description).to.equal(item.description)
    expect(createdItem.categoryId).to.equal(item.categoryId)
  })

  it('prevents Item creation when no category is defined', function *() {
    const item = {
      name: 'Item to create',
      description: 'Whatever'
    }
    const response = yield itemAPI.post().send(item).expect(400).end()
    expect(response.body.error)
      .to.contain('categoryId').and
      .to.contain('required')
  })

  it('creates Item whithout a description', function *() {
    const item = {
      name: 'Item lacking a description'
    }
    const createdItem = yield itemAPI.create(item)
    expect(createdItem.uuid).to.exist
  })

  it('prevents Item creation if categoryId is not a valid UUID', function *() {
    const item = {
      name: 'Item to create',
      description: 'Whatever',
      categoryId: 'Not a UUID'
    }
    const response = yield itemAPI.post().send(item).expect(400).end()
    expect(response.body.error).to.contain(item.categoryId)
  })

  it('prevents Item creation if no Category exists for given categoryId', function *() {
    const item = {
      name: 'Item to create',
      description: 'Whatever',
      categoryId: 'b5afa2c7-1e55-4eea-b880-952e56721720'
    }
    const response = yield itemAPI.post().send(item).expect(400).end()
    expect(response.body.error).to.contain(item.categoryId)
  })

  it('finds Item', function *() {
    const item = yield itemAPI.create()

    const foundItem = yield itemAPI.find(item.uuid)
    expect(foundItem).to.deep.equal(item)
  })

})
