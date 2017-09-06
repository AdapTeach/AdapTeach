import {expect} from 'chai'
import {categoryRepo} from './categoryRepo'

describe('categoryRepo', () => {

   describe('when root Category is created', () => {
      let categoryData
      let category
      beforeEach(async () => {
         categoryData = {name: 'Test Category'}
         category = await categoryRepo.create(categoryData)
      })

      it('creates RootCategory', async () => {
         expect(category.uuid).to.exist
         expect(category.name).to.equal(categoryData.name)
      })

      it('finds Category by ID', async () => {
         const found = await categoryRepo.find(category.uuid)
         expect(found.uuid).to.equal(category.uuid)
         expect(found.name).to.equal(category.name)
      })

      it('finds Category by name', async () => {
         const found = await categoryRepo.search(category.name)
         expect(found).to.deep.include(category)
      })

      it('finds Category by partial name', async () => {
         const found = await categoryRepo.search(category.name.substr(0, 3))
         expect(found).to.deep.include(category)
      })

      it('finds Category case-insensitively', async () => {
         const found = await categoryRepo.search(category.name.toUpperCase())
         expect(found).to.deep.include(category)
      })

   })

   describe('when child Category is created', () => {
      let parent
      let child

      beforeEach(async () => {
         parent = await categoryRepo.create({name: 'Parent Category'})
         child = await categoryRepo.create({
            name: 'Child Category',
            parent: parent.uuid
         })
      })

      it('returns parent', async () => {
         expect(child.parent.uuid).to.equal(parent.uuid)
      })

      it('returns parent when finding child Category by ID', async () => {
         const found = await categoryRepo.find(child.uuid)
         expect(found.parent!.uuid).to.equal(parent.uuid)
      })

      describe('when grandchild Category is created', () => {
         let grandchild
         beforeEach(async () => {
            grandchild = await categoryRepo.create({name: 'Grandchild Category', parent: child.uuid})
         })

         it('returns parent hierarchy', async () => {
            expect(grandchild.parent.uuid).to.equal(child.uuid)
            expect(grandchild.parent.parent.uuid).to.equal(parent.uuid)
         })

         it('finds parent hierarchy', async () => {
            const found = await categoryRepo.find(grandchild.uuid)

            expect(found.parent!.uuid).to.equal(child.uuid)
            expect(found.parent!.parent!.uuid).to.equal(parent.uuid)
         })

         it('returns parent hierarchy when searching grandchild Category by name', async () => {
            const found = await categoryRepo.search(grandchild.name)

            expect(found).to.deep.include(grandchild)
         })
      })
   })

})
