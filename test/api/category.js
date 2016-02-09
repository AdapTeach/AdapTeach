const expect = require('chai').expect

const api = require('./util/api')
const categoryAPI = require('./util/categoryAPI')

describe('Category API', () => {

  it('creates Category', function *() {
    const category = {name: 'Category to create'}
    const createdCategory = yield categoryAPI.create(category)
    expect(createdCategory.uuid).to.exist
    expect(createdCategory.name).to.equal(category.name)
    expect(createdCategory.parents).to.exist
  })

  it('creates child Category', function *() {
    const parent = yield categoryAPI.create({name: 'Parent Category'})
    const child = yield categoryAPI.create({
      name: 'Child Category',
      parentId: parent.uuid
    })
    expect(child.uuid).to.exist
    expect(child.parents[0].uuid).to.equal(parent.uuid)
  })

  it('finds Category', function *() {
    const category = yield categoryAPI.create()

    const foundCategory = yield categoryAPI.find(category.uuid)
    expect(foundCategory.uuid).to.equal(category.uuid)
    expect(foundCategory.name).to.equal(category.name)
  })

  it('lists all Categories', function *() {
    const category1 = yield categoryAPI.create()
    const category2 = yield categoryAPI.create()

    const categories = yield categoryAPI.list()
    const ids = categories.map(c => c.uuid)

    expect(ids).to.contain(category1.uuid)
    expect(ids).to.contain(category2.uuid)
  })

  it('finds Category by name', function *() {
    const category = yield categoryAPI.create()
    const found = yield categoryAPI.search(category.name)
    expect(found).to.contain(category)
  })

  it('finds Category by partial name', function *() {
    const category = yield categoryAPI.create()
    const found = yield categoryAPI.search(category.name.substr(0, 3))
    expect(found).to.contain(category)
  })

  it('finds Category case-insensitively', function *() {
    const category = yield categoryAPI.create()
    const found = yield categoryAPI.search(category.name.toUpperCase())
    expect(found).to.contain(category)
  })

  it('finds parent hierarchy', function *() {
    const parent1 = yield categoryAPI.create({name: 'Category Parent 1'})
    const parent2 = yield categoryAPI.create({name: 'Category Parent 2', parentId: parent1.uuid})
    const parent3 = yield categoryAPI.create({name: 'Category Parent 3', parentId: parent2.uuid})

    const found = yield categoryAPI.find(parent3.uuid)

    expect(found.parents[0].uuid).to.equal(parent2.uuid)
    expect(found.parents[1].uuid).to.equal(parent1.uuid)
  })

  it('returns parent hierarchy when creating Category', function *() {
    const parent1 = yield categoryAPI.create({name: 'Category Parent 1'})
    const parent2 = yield categoryAPI.create({name: 'Category Parent 2', parentId: parent1.uuid})
    const parent3 = yield categoryAPI.create({name: 'Category Parent 3', parentId: parent2.uuid})

    expect(parent3.parents[0].uuid).to.equal(parent2.uuid)
    expect(parent3.parents[1].uuid).to.equal(parent1.uuid)
  })

})
