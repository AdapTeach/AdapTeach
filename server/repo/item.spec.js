const expect = require('expect')
const stub = require('./stub.data')
const itemRepo = require('./item')
const categoryRepo = require('./category')
const InvalidArgumentError = require('../error/invalid-argument')

describe('itemRepo', () => {

  it('creates Item', function *() {
    const category = yield stub.category()
    const itemData = {
      name: 'Test Item',
      categoryId: category.uuid
    }
    const item = yield itemRepo.create(itemData)
    expect(item.uuid).toExist()
    expect(item.name).toEqual(itemData.name)
  })

  it('prevents Item creation when no category is defined', function *() {
    const itemWithoutCategory = {
      name: 'Item to create',
      description: 'Whatever'
    }
    try {
      yield itemRepo.create(itemWithoutCategory)
      throw Error('Should throw !')
    } catch (error) {
      expect(error).toBeA(InvalidArgumentError)
    }
  })

  it('creates Item without a description', function *() {
    const category = yield stub.category()
    const created = yield itemRepo.create({
      name: 'Item lacking a description',
      categoryId: category.uuid
    })
    expect(created.uuid).toExist()
  })

  it('prevents Item creation if categoryId is not a valid UUID', function *() {
    const itemWithInvalidCategoryId = {
      name: 'Item to create',
      description: 'Whatever',
      categoryId: 'Not a UUID'
    }
    try {
      yield itemRepo.create(itemWithInvalidCategoryId)
      throw Error('Should throw !')
    } catch (error) {
      expect(error).toBeA(InvalidArgumentError)
    }
  })

  it('prevents Item creation if no Category exists for given categoryId', function *() {
    const itemWithNonExistentCategory = {
      name: 'Item to create',
      description: 'Whatever',
      categoryId: 'b5afa2c7-1e55-4eea-b880-952e56721720'
    }
    try {
      yield itemRepo.create(itemWithNonExistentCategory)
      throw Error('Should throw !')
    } catch (error) {
      expect(error).toBeA(InvalidArgumentError)
    }
  })

  describe('when Item is created', () => {
    var item
    beforeEach(function *() {
      item = yield stub.item()
    })

    it('finds Item', function *() {
      const foundItem = yield itemRepo.find(item.uuid)
      expect(foundItem).toEqual(item)
    })

  })

  describe('when Category has grandparent', () => {
    var grandparentCategory
    var parentCategory
    var category
    var item

    beforeEach(function *() {
      grandparentCategory = yield categoryRepo.create({name: 'Grandparent Category'})
      parentCategory = yield categoryRepo.create({name: 'Parent Category', parentId: grandparentCategory.uuid})
      category = yield categoryRepo.create({name: 'Category with Grandparent', parentId: parentCategory.uuid})
      item = yield itemRepo.create({
        name: 'Item with deep Category hierarchy',
        categoryId: category.uuid
      })
    })

    it('returns Category hierarchy when creating item', function *() {
      console.log(item)
      expect(item.category.parent.uuid).toEqual(parentCategory.uuid)
      expect(item.category.parent.parent.uuid).toEqual(grandparentCategory.uuid)
    })

    it('returns Category hierarchy when getting Item by ID', function *() {
      const found = yield itemRepo.find(item.uuid)
      expect(found).toEqual(item)
    })
  })

})
