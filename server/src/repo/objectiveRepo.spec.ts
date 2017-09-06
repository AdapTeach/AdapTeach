import {expect} from 'chai'
import {stub} from './stubFactory'
import {objectiveRepo} from './objectiveRepo'

describe('Objective API', () => {

   describe('for existing Item', () => {
      let item

      beforeEach(async () => {
         item = await stub.item()
      })

      it('finds Item by uuid', async () => {
         const found = await objectiveRepo.find(item.uuid)
         expect(found.uuid).to.equal(item.uuid)
      })

      it('finds Item by name', async () => {
         const result = await objectiveRepo.search(item.name)
         const foundItemIds = result.items.map(i => i.uuid)
         expect(foundItemIds).to.contain(item.uuid)
      })

   })

   describe('for existing Composite', () => {
      let composite

      beforeEach(async () => {
         composite = await stub.composite()
      })

      it('finds Composite by uuid', async () => {
         const found = await objectiveRepo.find(composite.uuid)
         expect(found.uuid).to.equal(composite.uuid)
      })

      it('finds Composite by name', async () => {
         const searchResult = await objectiveRepo.search(composite.name)
         const foundCompositeIds = searchResult.composites.map(c => c.uuid)
         expect(foundCompositeIds).to.contain(composite.uuid)
      })

   })

   describe('for unknown Objective name', () => {

      it('finds no matching Objective', async () => {
         const found = await objectiveRepo.search('DZIPZDIJPJCIPZIPJDZJPICSDAIPJDZIP')
         const {composites, items} = found
         expect(composites.length).to.equal(0)
         expect(items.length).to.equal(0)
      })

   })

})
