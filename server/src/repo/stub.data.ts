import {userRepo} from './userRepo'
import {assessmentRepo} from './assessmentRepo'
const categoryRepo = require('./category')
const compositeRepo = require('./composite')
const itemRepo = require('./item')

const createAssessment = async() => {
   const item = await createItem()
   return await assessmentRepo.create({
      name: 'Test Assessment',
      testedItemIds: [item.uuid]
   })
}

const createCategory = () => categoryRepo.create({name: 'Stub Category'})

const createCategoryWithGrandparent = async() => {
   const grandparentCategory = await categoryRepo.create({name: 'Grandparent Category'})
   const parentCategory = await categoryRepo.create({name: 'Parent Category', parentId: grandparentCategory.uuid})
   return await categoryRepo.create({name: 'Category with Grandparent', parentId: parentCategory.uuid})
}

const createComposite = async() => {
   const item = await createItem()
   return await compositeRepo.create({
      name: 'Stub Composite',
      componentIds: [item.uuid]
   })
}

const createItem = async() => {
   const category = await createCategory()
   return await itemRepo.create({
      name: 'Test Item',
      categoryId: category.uuid
   })
}

const createUser = () => userRepo.create({name: 'Stub User'})

module.exports = {
   assessment: createAssessment,
   category: createCategory,
   categoryWithGrandparent: createCategoryWithGrandparent,
   composite: createComposite,
   item: createItem,
   user: createUser
}
