const expect = require('chai').expect

const itemAPI = require('./api/itemAPI')
const categoryAPI = require('./api/categoryAPI')

describe('Item API', () => {
  var itemData
  var item
  var category

  beforeEach(function *() {
    category = yield categoryAPI.create()
    itemData = {
      name: 'Item to create',
      description: 'Whatever',
      categoryId: category.uuid
    }
    item = yield itemAPI.create(itemData)
  })

  it('creates Item', function *() {
    expect(item.uuid).to.exist
    expect(item.name).to.equal(itemData.name)
    expect(item.description).to.equal(itemData.description)
    expect(item.category.uuid).to.equal(itemData.categoryId)
  })

  it('prevents Item creation when no category is defined', function *() {
    const itemWithoutCategory = {
      name: 'Item to create',
      description: 'Whatever'
    }
    const response = yield itemAPI.post().send(itemWithoutCategory).expect(400).end()
    expect(response.body.error)
      .to.contain('categoryId').and
      .to.contain('required')
  })

  it('creates Item without a description', function *() {
    const created = yield itemAPI.create({
      name: 'Item lacking a description'
    })
    expect(created.uuid).to.exist
  })

  it('prevents Item creation if categoryId is not a valid UUID', function *() {
    const itemWithInvalidCategoryId = {
      name: 'Item to create',
      description: 'Whatever',
      categoryId: 'Not a UUID'
    }
    const response = yield itemAPI.post().send(itemWithInvalidCategoryId).expect(400).end()
    expect(response.body.error).to.contain(itemWithInvalidCategoryId.categoryId)
  })

  it('prevents Item creation if no Category exists for given categoryId', function *() {
    const itemWithNonExistentCategory = {
      name: 'Item to create',
      description: 'Whatever',
      categoryId: 'b5afa2c7-1e55-4eea-b880-952e56721720'
    }
    const response = yield itemAPI.post().send(itemWithNonExistentCategory).expect(400).end()
    expect(response.body.error).to.contain(itemWithNonExistentCategory.categoryId)
  })

  it('finds Item', function *() {
    const foundItem = yield itemAPI.find(item.uuid)
    expect(foundItem).to.deep.equal(item)
  })

  describe('when Category has grandparent', () => {
    var parentCategory
    var grandparentCategory

    beforeEach(function *() {
      grandparentCategory = yield categoryAPI.create({name: 'Grandparent Category'})
      parentCategory = yield categoryAPI.create({name: 'Parent Category', parentId: grandparentCategory.uuid})
      category = yield categoryAPI.create({name: 'Item Category', parentId: parentCategory.uuid})
      item = yield itemAPI.create({
        name: 'Item with deep Category hierarchy',
        categoryId: category.uuid
      })
    })

    it('returns Category hierarchy when creating item', function *() {
      expect(item.category.parent.uuid).to.equal(parentCategory.uuid)
      expect(item.category.parent.parent.uuid).to.equal(grandparentCategory.uuid)
    })

    it('returns Category hierarchy when getting Item by ID', function *() {
      const found = yield itemAPI.find(item.uuid)
      expect(found).to.deep.equal(item)
    })
  })

})
