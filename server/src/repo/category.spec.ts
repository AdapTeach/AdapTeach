import * as expect from 'expect'
const stub = require('./stub.data')
const categoryRepo = require('./category')

describe('categoryRepo', () => {

   describe('when root Category is created', () => {
      let categoryData
      let category
      beforeEach(async() => {
         categoryData = {name: 'Test Category'}
         category = await categoryRepo.create(categoryData)
      })

      it('creates RootCategory', async() => {
         expect(category.uuid).toExist()
         expect(category.name).toEqual(categoryData.name)
      })

      it('finds Category by ID', async() => {
         const found = await categoryRepo.find(category.uuid)
         expect(found.uuid).toEqual(category.uuid)
         expect(found.name).toEqual(category.name)
      })

      it('finds Category by name', async() => {
         const found = await categoryRepo.search(category.name)
         expect(found).toContain(category)
      })

      it('finds Category by partial name', async() => {
         const found = await categoryRepo.search(category.name.substr(0, 3))
         expect(found).toContain(category)
      })

      it('finds Category case-insensitively', async() => {
         const found = await categoryRepo.search(category.name.toUpperCase())
         expect(found).toContain(category)
      })

   })

   describe('when child Category is created', () => {
      let parent
      let child

      beforeEach(async() => {
         parent = await categoryRepo.create({name: 'Parent Category'})
         child = await categoryRepo.create({
            name: 'Child Category',
            parentId: parent.uuid
         })
      })

      it('returns parent', async() => {
         expect(child.parent.uuid).toEqual(parent.uuid)
      })

      it('returns parent when finding child Category by ID', async() => {
         const found = await categoryRepo.find(child.uuid)
         expect(found.parent.uuid).toEqual(parent.uuid)
      })

      describe('when grandchild Category is created', () => {
         let grandchild
         beforeEach(async() => {
            grandchild = await categoryRepo.create({name: 'Grandchild Category', parentId: child.uuid})
         })

         it('returns parent hierarchy', async() => {
            expect(grandchild.parent.uuid).toEqual(child.uuid)
            expect(grandchild.parent.parent.uuid).toEqual(parent.uuid)
         })

         it('finds parent hierarchy', async() => {
            const found = await categoryRepo.find(grandchild.uuid)

            expect(found.parent.uuid).toEqual(child.uuid)
            expect(found.parent.parent.uuid).toEqual(parent.uuid)
         })

         it('returns parent hierarchy when searching grandchild Category by name', async() => {
            const found = await categoryRepo.search(grandchild.name)

            expect(found).toContain(grandchild)
         })
      })
   })

})
