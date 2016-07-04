const assessmentRepo = require('./assessment')
const categoryRepo = require('./category')
const compositeRepo = require('./composite')
const itemRepo = require('./item')
const objectiveRepo = require('./objective')
const quizRepo = require('./quiz')
const userRepo = require('./user')

function *createCategory() {
  const category = yield categoryRepo.create({name: 'Stub Category'})
  return category
}

function *createCategoryWithGrandparent() {
  const grandparentCategory = yield categoryRepo.create({name: 'Grandparent Category'})
  const parentCategory = yield categoryRepo.create({name: 'Parent Category', parentId: grandparentCategory.uuid})
  const category = yield categoryRepo.create({name: 'Category with Grandparent', parentId: parentCategory.uuid})
  return category
}

function *createItem() {
  const category = yield createCategory()
  const item = yield itemRepo.create({
    name: 'Test Item',
    categoryId: category.uuid
  })
  return item
}

function *createUser() {
  const user = yield userRepo.create({name: 'Stub User'})
  return user
}

module.exports = {
  category: createCategory,
  categoryWithGrandparent: createCategoryWithGrandparent,
  item: createItem,
  user: createUser
}
