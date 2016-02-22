const expect = require('chai').expect

const api = require('./util/api')
const categoryAPI = require('./util/categoryAPI')

describe('Category API', () => {

  describe('when root Category is created', () => {
    var category
    var created

    beforeEach(function *() {
      category = {name: 'Category to create'}
      created = yield categoryAPI.create(category)
    })

    it('returns created category', function *() {
      expect(created.uuid).to.exist
      expect(created.name).to.equal(category.name)
    })

    it('returns no parent', function *() {
      expect(created.parent).to.be.undefined
    })

    it('finds Category by ID', function *() {
      const found = yield categoryAPI.find(created.uuid)
      expect(found.uuid).to.equal(created.uuid)
      expect(found.name).to.equal(created.name)
    })

    it('finds Category by name', function *() {
      const found = yield categoryAPI.search(created.name)
      expect(found).to.contain(created)
    })

    it('finds Category by partial name', function *() {
      const found = yield categoryAPI.search(created.name.substr(0, 3))
      expect(found).to.contain(created)
    })

    it('finds Category case-insensitively', function *() {
      const found = yield categoryAPI.search(created.name.toUpperCase())
      expect(found).to.contain(created)
    })
  })

  describe('when child Category is created', () => {
    var parent
    var child

    beforeEach(function *() {
      parent = yield categoryAPI.create({name: 'Parent Category'})
      child = yield categoryAPI.create({
        name: 'Child Category',
        parentId: parent.uuid
      })
    })

    it('returns parent', function *() {
      expect(child.parent.uuid).to.equal(parent.uuid)
    })

    it('returns parent when finding child Category by ID', function *() {
      const found = yield categoryAPI.find(child.uuid)
      expect(found.parent.uuid).to.equal(parent.uuid)
    })

    describe('when grandchild Category is created', () => {
      var grandchild

      beforeEach(function *() {
        grandchild = yield categoryAPI.create({name: 'Grandchild Category', parentId: child.uuid})
      })

      it('returns parent hierarchy', function *() {
        expect(grandchild.parent.uuid).to.equal(child.uuid)
        expect(grandchild.parent.parent.uuid).to.equal(parent.uuid)
      })

      it('finds parent hierarchy', function *() {
        const found = yield categoryAPI.find(grandchild.uuid)

        expect(found.parent.uuid).to.equal(child.uuid)
        expect(found.parent.parent.uuid).to.equal(parent.uuid)
      })

      it('returns parent hierarchy when searching grandchild Category by name', function *() {
        const found = yield categoryAPI.search(grandchild.name)

        expect(found).to.contain(grandchild)
      })
    })
  })

  // TODO find a use case for this feature, or delete it
  it.skip('lists all Categories', function *() {
    const category1 = yield categoryAPI.create()
    const category2 = yield categoryAPI.create()

    const categories = yield categoryAPI.list()
    const ids = categories.map(c => c.uuid)

    expect(ids).to.contain(category1.uuid)
    expect(ids).to.contain(category2.uuid)
  })

})
