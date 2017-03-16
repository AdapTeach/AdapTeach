import * as expect from 'expect'
import {InvalidArgumentError} from '../error/InvalidArgumentError'
import {categoryRepo} from './categoryRepo'
import {itemRepo} from './itemRepo'
import {stub} from './stubFactory'

describe('itemRepo', () => {

   it('creates Item', async() => {
      const category = await stub.category()
      const itemData = {
         name: 'Test Item',
         description: '',
         category: category.uuid
      }
      const item = await itemRepo.create(itemData)
      expect(item.uuid).toExist()
      expect(item.name).toEqual(itemData.name)
   })

   it('prevents Item creation when no category is defined', async() => {
      const itemWithoutCategory: any = {
         name: 'Item to create',
         description: 'Whatever',
      }
      try {
         await itemRepo.create(itemWithoutCategory)
         throw Error('Should throw !')
      } catch (error) {
         expect(error).toBeA(InvalidArgumentError)
      }
   })

   it('creates Item without a description', async() => {
      const category = await stub.category()
      const created = await itemRepo.create({
         name: 'Item lacking a description',
         description: '',
         category: category.uuid
      })
      expect(created.uuid).toExist()
   })

   it('prevents Item creation if categoryId is not a valid UUID', async() => {
      const itemWithInvalidCategoryId = {
         name: 'Item to create',
         description: 'Whatever',
         category: 'Not a UUID'
      }
      try {
         await itemRepo.create(itemWithInvalidCategoryId)
         throw Error('Should throw !')
      } catch (error) {
         expect(error).toBeA(InvalidArgumentError)
      }
   })

   it('prevents Item creation if no Category exists for given categoryId', async() => {
      const itemWithNonExistentCategory = {
         name: 'Item to create',
         description: 'Whatever',
         category: 'b5afa2c7-1e55-4eea-b880-952e56721720'
      }
      try {
         await itemRepo.create(itemWithNonExistentCategory)
         throw Error('Should throw !')
      } catch (error) {
         expect(error).toBeA(InvalidArgumentError)
      }
   })

   describe('when Item is created', () => {
      let item
      beforeEach(async() => {
         item = await stub.item()
      })

      it('finds Item', async() => {
         const foundItem = await itemRepo.find(item.uuid)
         expect(foundItem).toEqual(item)
      })

   })

   describe('when Category has grandparent', () => {
      let grandparentCategory
      let parentCategory
      let category
      let item

      beforeEach(async() => {
         grandparentCategory = await categoryRepo.create({name: 'Grandparent Category'})
         parentCategory = await categoryRepo.create({name: 'Parent Category', parentId: grandparentCategory.uuid})
         category = await categoryRepo.create({name: 'Category with Grandparent', parentId: parentCategory.uuid})
         item = await itemRepo.create({
            name: 'Item with deep Category hierarchy',
            description: '',
            category: category.uuid
         })
      })

      it('returns Category hierarchy when creating item', async() => {
         expect(item.category.parent.uuid).toEqual(parentCategory.uuid)
         expect(item.category.parent.parent.uuid).toEqual(grandparentCategory.uuid)
      })

      it('returns Category hierarchy when getting Item by ID', async() => {
         const found = await itemRepo.find(item.uuid)
         expect(found).toEqual(item)
      })
   })

})
