import {userRepo} from './userRepo'
import {assessmentRepo} from './assessmentRepo'
import {categoryRepo} from './categoryRepo'
import {compositeRepo} from './compositeRepo'
import {itemRepo} from './itemRepo'
import {Category} from '../domain/Category'
import {Item} from '../domain/Item'
import {Composite} from '../domain/Composite'

const createCategory = (): Promise<Category> => categoryRepo.create({name: 'Stub Category'})

const createCategoryWithGrandparent = async (): Promise<Category> => {
   const grandparentCategory = await categoryRepo.create({name: 'Grandparent Category'})
   const parentCategory = await categoryRepo.create({name: 'Parent Category', parent: grandparentCategory.uuid})
   return await categoryRepo.create({name: 'Category with Grandparent', parent: parentCategory.uuid})
}

const createItem = async (): Promise<Item> => {
   const category = await createCategory()
   return await itemRepo.create({
      name: 'Test Item',
      description: '',
      category: category.uuid
   })
}

const createComposite = async (): Promise<Composite> => {
   const item = await createItem()
   return await compositeRepo.create({
      name: 'Stub Composite',
      description: '',
      subObjectives: [item.uuid]
   })
}

const createUser = () => userRepo.create({name: 'Stub User'})

const createAssessment = async () => {
   const item = await createItem()
   return await assessmentRepo.create({
      name: 'Test Assessment',
      testedItemIds: [item.uuid]
   })
}

export const stub = {
   assessment: createAssessment,
   category: createCategory,
   categoryWithGrandparent: createCategoryWithGrandparent,
   composite: createComposite,
   item: createItem,
   user: createUser
}
