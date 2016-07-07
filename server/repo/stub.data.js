const assessmentRepo = require('./assessment')
const categoryRepo = require('./category')
const compositeRepo = require('./composite')
const itemRepo = require('./item')
const objectiveRepo = require('./objective')
const quizRepo = require('./quiz')
const userRepo = require('./user')

function *createAssessment() {
  const item = yield createItem()
  const assessment = yield assessmentRepo.create({
    name: 'Test Assessment',
    testedItemIds: [item.uuid]
  })
  return assessment
}

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

function *createComposite() {
  const item = yield createItem()
  const composite = yield compositeRepo.create({
    name: 'Stub Composite',
    componentIds: [item.uuid]
  })
  return composite
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
  assessment: createAssessment,
  category: createCategory,
  categoryWithGrandparent: createCategoryWithGrandparent,
  composite: createComposite,
  item: createItem,
  user: createUser
}
