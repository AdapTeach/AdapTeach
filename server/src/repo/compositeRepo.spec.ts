import * as expect from 'expect'
import {InvalidArgumentError} from '../error/InvalidArgumentError'
import {stub} from './stubFactory'
import {compositeRepo} from './compositeRepo'

describe('Composite API', () => {

   it('creates Composite when componentIds field array is missing', async() => {
      const composite = await compositeRepo.create({
         name: 'Empty Composite',
         description: 'Whatever'
      })
      expect(composite.uuid).toExist()
   })

   it('prevents Composite creation when name is missing', async() => {
      const compositeWithoutName = {
         description: 'Whatever'
      }
      try {
         await compositeRepo.create(compositeWithoutName)
         throw Error('Should throw !')
      } catch (error) {
         expect(error).toBeA(InvalidArgumentError)
      }
   })

   describe('when Composite with no components is created', () => {
      const compositeFields = {
         name: 'Empty Composite',
         description: 'Whatever',
         componentIds: []
      }
      let composite

      beforeEach(async() => {
         composite = await compositeRepo.create(compositeFields)
      })

      it('returns created Composite', async() => {
         expect(composite.uuid).toExist()
         expect(composite.name).toEqual(compositeFields.name)
         expect(composite.description).toEqual(compositeFields.description)
      })

      it('finds Composite by ID', async() => {
         const found = await compositeRepo.find(composite.uuid)
         expect(found).toEqual(composite)
      })

   })

   describe('when Composite with single Item component is created', () => {
      let item
      let composite

      beforeEach(async() => {
         item = await stub.item()
         const compositeFields = {
            name: 'Composite with single Item component',
            componentIds: [item.uuid]
         }
         composite = await compositeRepo.create(compositeFields)
      })

      it('returns Item in components', async() => {
         const itemIds = composite.components.items.map(item => item.uuid)
         expect(itemIds.length).toEqual(1)
         expect(itemIds).toInclude(item.uuid)
      })

      describe('when finding Composite by ID', () => {
         let found

         beforeEach(async() => {
            found = await compositeRepo.find(composite.uuid)
         })

         it('returns Item in components', async() => {
            const itemIds = found.components.items.map(item => item.uuid)
            expect(itemIds.length).toEqual(1)
            expect(itemIds).toInclude(item.uuid)
         })
      })

   })

   describe('when Composite with many Items components is created', () => {
      let item1
      let item2
      let composite

      beforeEach(async() => {
         item1 = await stub.item()
         item2 = await stub.item()
         const compositeFields = {
            name: 'Composite with many Items as objectives',
            componentIds: [item1.uuid, item2.uuid]
         }
         composite = await compositeRepo.create(compositeFields)
      })

      it('returns Items in components', async() => {
         expect(composite.components.items.length).toEqual(2)
         expect(composite.components.items).toInclude(item1)
         expect(composite.components.items).toInclude(item2)
      })
   })

})
