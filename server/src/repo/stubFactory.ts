import {userRepo} from './userRepo'
import {assessmentRepo} from './assessmentRepo'
import {categoryRepo} from './categoryRepo'
import {compositeRepo} from './compositeRepo'
import {itemRepo} from './itemRepo'

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
      description: '',
      subObjectives: [item.uuid]
   })
}

const createItem = async() => {
   const category = await createCategory()
   return await itemRepo.create({
      name: 'Test Item',
      description: '',
      category: category.uuid
   })
}

const createUser = () => userRepo.create({name: 'Stub User'})

export const stub = {
   assessment: createAssessment,
   category: createCategory,
   categoryWithGrandparent: createCategoryWithGrandparent,
   composite: createComposite,
   item: createItem,
   user: createUser
}
