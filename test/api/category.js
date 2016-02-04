const expect = require('chai').expect

const api = require('./util/api')
const categoryAPI = require('./util/categoryAPI')

describe('Category API', () => {

  it('creates Category', function *() {
    const category = {name: 'Category to create'}
    const createdCategory = yield categoryAPI.create(category)
    expect(createdCategory.uuid).to.exist
    expect(createdCategory.name).to.equal(category.name)
  })

  it('creates child Category', function *() {
    const parent = yield categoryAPI.create({name: 'Parent Category'})
    const child = yield categoryAPI.create({
      name: 'Child Category',
      parentId: parent.uuid
    })
    expect(child.uuid).to.exist
    expect(child.parentId).to.equal(parent.uuid)
  })

  it('finds Category', function *() {
    const category = yield categoryAPI.create()

    const foundCategory = yield categoryAPI.find(category.uuid)
    expect(foundCategory).to.deep.equal(category)
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

})
