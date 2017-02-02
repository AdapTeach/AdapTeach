import * as expect from 'expect'
const stub = require('./stub.data')
const categoryRepo = require('./category')

describe('categoryRepo', () => {

  describe('when root Category is created', () => {
    let categoryData
    let category
    beforeEach(function *() {
      categoryData = {name: 'Test Category'}
      category = yield categoryRepo.create(categoryData)
    })

    it('creates RootCategory', function *() {
      expect(category.uuid).toExist()
      expect(category.name).toEqual(categoryData.name)
    })

    it('finds Category by ID', function *() {
      const found = yield categoryRepo.find(category.uuid)
      expect(found.uuid).toEqual(category.uuid)
      expect(found.name).toEqual(category.name)
    })

    it('finds Category by name', function *() {
      const found = yield categoryRepo.search(category.name)
      expect(found).toContain(category)
    })

    it('finds Category by partial name', function *() {
      const found = yield categoryRepo.search(category.name.substr(0, 3))
      expect(found).toContain(category)
    })

    it('finds Category case-insensitively', function *() {
      const found = yield categoryRepo.search(category.name.toUpperCase())
      expect(found).toContain(category)
    })

  })

  describe('when child Category is created', () => {
    let parent
    let child

    beforeEach(function *() {
      parent = yield categoryRepo.create({name: 'Parent Category'})
      child = yield categoryRepo.create({
        name: 'Child Category',
        parentId: parent.uuid
      })
    })

    it('returns parent', function *() {
      expect(child.parent.uuid).toEqual(parent.uuid)
    })

    it('returns parent when finding child Category by ID', function *() {
      const found = yield categoryRepo.find(child.uuid)
      expect(found.parent.uuid).toEqual(parent.uuid)
    })

    describe('when grandchild Category is created', () => {
      let grandchild
      beforeEach(function *() {
        grandchild = yield categoryRepo.create({name: 'Grandchild Category', parentId: child.uuid})
      })

      it('returns parent hierarchy', function *() {
        expect(grandchild.parent.uuid).toEqual(child.uuid)
        expect(grandchild.parent.parent.uuid).toEqual(parent.uuid)
      })

      it('finds parent hierarchy', function *() {
        const found = yield categoryRepo.find(grandchild.uuid)

        expect(found.parent.uuid).toEqual(child.uuid)
        expect(found.parent.parent.uuid).toEqual(parent.uuid)
      })

      it('returns parent hierarchy when searching grandchild Category by name', function *() {
        const found = yield categoryRepo.search(grandchild.name)

        expect(found).toContain(grandchild)
      })
    })
  })

})
