import {expect} from 'chai'
import {InvalidArgumentError} from '../error/InvalidArgumentError'
import {categoryRepo} from './categoryRepo'
import {itemRepo} from './itemRepo'
import {stub} from './stubFactory'
import {ITEM} from '../domain/Objective'

describe('itemRepo', () => {

   it('creates Item', async () => {
      const category = await stub.category()
      const itemFields = {
         name: 'Test Item',
         description: '',
         category: category.uuid
      }
      const item = await itemRepo.create(itemFields)
      expect(item.uuid).to.exist
      expect(item.name).to.equal(itemFields.name)
      expect(item.type).to.equal(ITEM)
   })

   it('prevents Item creation when no category is defined', async () => {
      const itemWithoutCategory: any = {
         name: 'Item to create',
         description: 'DynamicComponentStore',
      }
      try {
         await itemRepo.create(itemWithoutCategory)
         throw Error('Should throw !')
      } catch (error) {
         expect(error).to.be.instanceof(InvalidArgumentError)
      }
   })

   it('creates Item without a description', async () => {
      const category = await stub.category()
      const created = await itemRepo.create({
         name: 'Item lacking a description',
         description: '',
         category: category.uuid
      })
      expect(created.uuid).to.exist
   })

   it('prevents Item creation if categoryId is not a valid UUID', async () => {
      const itemWithInvalidCategoryId = {
         name: 'Item to create',
         description: 'DynamicComponentStore',
         category: 'Not a UUID'
      }
      try {
         await itemRepo.create(itemWithInvalidCategoryId)
         throw Error('Should throw !')
      } catch (error) {
         expect(error).to.be.instanceof(InvalidArgumentError)
      }
   })

   it('prevents Item creation if no Category exists for given categoryId', async () => {
      const itemWithNonExistentCategory = {
         name: 'Item to create',
         description: 'DynamicComponentStore',
         category: 'b5afa2c7-1e55-4eea-b880-952e56721720'
      }
      try {
         await itemRepo.create(itemWithNonExistentCategory)
         throw Error('Should throw !')
      } catch (error) {
         expect(error).to.be.instanceof(InvalidArgumentError)
      }
   })

   describe('when Item is created', () => {
      let item
      beforeEach(async () => {
         item = await stub.item()
      })

      it('finds Item', async () => {
         const foundItem = await itemRepo.find(item.uuid)
         expect(foundItem).to.deep.equal(item)
      })
   })

   describe('when Category has grandparent', () => {
      let grandparentCategory
      let parentCategory
      let category
      let item

      beforeEach(async () => {
         grandparentCategory = await categoryRepo.create({name: 'Grandparent Category'})
         parentCategory = await categoryRepo.create({name: 'Parent Category', parent: grandparentCategory.uuid})
         category = await categoryRepo.create({name: 'Category with Grandparent', parent: parentCategory.uuid})
         item = await itemRepo.create({
            name: 'Item with deep Category hierarchy',
            description: '',
            category: category.uuid
         })
      })

      it('returns Category hierarchy when creating item', async () => {
         expect(item.category.parent.uuid).to.equal(parentCategory.uuid)
         expect(item.category.parent.parent.uuid).to.equal(grandparentCategory.uuid)
      })

      it('returns Category hierarchy when getting Item by ID', async () => {
         const found = await itemRepo.find(item.uuid)
         expect(found).to.deep.equal(item)
      })
   })

})
