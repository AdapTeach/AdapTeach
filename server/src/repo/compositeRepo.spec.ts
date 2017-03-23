import * as expect from 'expect'
import {stub} from './stubFactory'
import {compositeRepo} from './compositeRepo'
import {COMPOSITE, ITEM} from '../domain/Objective'
import {Composite} from '../domain/Composite'
import {Item} from '../domain/Item'

describe('compositeRepo', () => {

   describe('when Composite with no sub-objective is created', () => {
      const compositeFields = {
         name: 'Empty Composite',
         description: 'Whatever',
         subObjectives: []
      }
      let composite: Composite

      beforeEach(async () => {
         composite = await compositeRepo.create(compositeFields)
      })

      it('returns created Composite', async () => {
         expect(composite.uuid).toExist()
         expect(composite.name).toEqual(compositeFields.name)
         expect(composite.description).toEqual(compositeFields.description)
         expect(composite.type).toEqual(COMPOSITE)
      })

      it('finds Composite by ID', async () => {
         const found = await compositeRepo.find(composite.uuid)
         expect(found).toEqual(composite)
      })

   })

   describe('when Composite with single Item is created', () => {
      let item: Item
      let composite: Composite

      beforeEach(async () => {
         item = await stub.item()
         composite = await compositeRepo.create({
            name: 'Composite with single Item component',
            description: '',
            subObjectives: [item.uuid]
         })
      })

      it('returns Item in sub-objectives', async () => {
         expect(composite.subObjectives.length).toEqual(1)
         expect(composite.subObjectives[0].type).toEqual(ITEM)
         expect(composite.subObjectives[0].uuid).toEqual(item.uuid)
      })

      describe('when finding Composite by ID', () => {
         let found: Composite

         beforeEach(async () => {
            found = await compositeRepo.find(composite.uuid)
         })

         it('returns Item in sub-objectives', async () => {
            expect(found.subObjectives.length).toEqual(1)
            expect(found.subObjectives[0].type).toEqual(ITEM)
            expect(found.subObjectives[0].uuid).toEqual(item.uuid)
         })
      })

   })

   describe('when Composite with many Items components is created', () => {
      let item1: Item
      let item2: Item
      let composite: Composite

      beforeEach(async () => {
         item1 = await stub.item()
         item2 = await stub.item()
         composite = await compositeRepo.create({
            name: 'Composite with many Items as objectives',
            description: '',
            subObjectives: [item1.uuid, item2.uuid]
         })
      })

      it('returns Items in sub-objectives', async () => {
         expect(composite.subObjectives.length).toEqual(2)
         expect(composite.subObjectives[0].type).toEqual(ITEM)
         expect(composite.subObjectives[1].type).toEqual(ITEM)
      })
   })

   describe('when Composite composed of single Composite is created', () => {
      let composite: Composite
      let child: Composite

      beforeEach(async () => {
         child = await stub.composite()
         composite = await compositeRepo.create({
            name: 'Composite composed of single Composite',
            description: '',
            subObjectives: [child.uuid]
         })
      })

      it('returns child Composite', async () => {
         expect(composite.subObjectives.length).toEqual(1)
         expect(composite.subObjectives[0].uuid).toEqual(child.uuid)
         expect(composite.subObjectives[0].type).toEqual(COMPOSITE)
      })
   })

})
