import {InvalidArgumentError} from '../error/InvalidArgumentError'
import * as expect from 'expect'
import {assessmentRepo} from './assessmentRepo'
import {stub} from './stubFactory'

const YES_OR_NO = [
   {text: 'Yes', correct: true},
   {text: 'No', correct: false}
]

describe('Assessment API', () => {

   it('creates simplest possible Quiz (one assessedItem, YES/NO question)', async() => {
      const item = await stub.item()
      const quiz = {
         type: 'Quiz',
         assessedItemIds: [item.uuid],
         question: 'Test Question ?',
         answers: YES_OR_NO
      }
      const created = await assessmentRepo.create(quiz)
      expect(created.uuid).toExist()
      expect(created.type).toEqual('Quiz')
      expect(created.assessedItems.map(i => i.uuid)).toEqual(quiz.assessedItemIds)
      expect(created.prerequisites).toExist()
      expect(created.activelyRecalledItems).toExist()
      expect(created.passivelyRecalledItems).toExist()
      expect(created.question).toEqual(quiz.question)
      expect(created.answers).toEqual(quiz.answers)
   })

   it('prevents Assessment creation when type is not defined', async() => {
      const item = await stub.item()
      const lackingType = {
         assessedItemIds: [item.uuid],
         question: 'Lacking type ?',
         answers: YES_OR_NO
      }
      try {
         await assessmentRepo.create(lackingType)
         throw Error('Should have failed')
      } catch (error) {
         expect(error).toBeA(InvalidArgumentError)
      }
   })

   it('creates Quiz with multiple assessedItems', async() => {
      const item1 = await stub.item()
      const item2 = await stub.item()
      const quiz = {
         type: 'Quiz',
         assessedItemIds: [item1.uuid, item2.uuid],
         question: 'Multiple assessedItems ?',
         answers: YES_OR_NO
      }
      const created = await assessmentRepo.create(quiz)
      expect(created.assessedItems.map(i => i.uuid)).toEqual(quiz.assessedItemIds)
   })

   it('creates Quiz with single Item as prerequisite', async() => {
      const assessedItem = await stub.item()
      const preq = await stub.item()
      const quiz = {
         type: 'Quiz',
         assessedItemIds: [assessedItem.uuid],
         prerequisiteIds: [preq.uuid],
         question: 'Single prerequisite ?',
         answers: YES_OR_NO
      }
      const created = await assessmentRepo.create(quiz)
      expect(created.prerequisites.map(preq => preq.uuid)).toEqual(quiz.prerequisiteIds)
   })

   it('creates Quiz with multiple Items as prerequisites', async() => {
      const assessedItem = await stub.item()
      const preq1 = await stub.item()
      const preq2 = await stub.item()
      const quiz = {
         type: 'Quiz',
         assessedItemIds: [assessedItem.uuid],
         prerequisiteIds: [preq1.uuid, preq2.uuid],
         question: 'Multiple prerequisites ?',
         answers: YES_OR_NO
      }
      const created = await assessmentRepo.create(quiz)
      expect(created.prerequisites.map(preq => preq.uuid)).toEqual(quiz.prerequisiteIds)
   })

   it('creates Quiz with single Composite as prerequisite', async() => {
      const assessedItem = await stub.item()
      const preq = await stub.composite()
      const quiz = {
         type: 'Quiz',
         assessedItemIds: [assessedItem.uuid],
         prerequisiteIds: [preq.uuid],
         question: 'Single composite as prerequisite ?',
         answers: YES_OR_NO
      }
      const created = await assessmentRepo.create(quiz)
      expect(created.prerequisites.map(preq => preq.uuid)).toEqual(quiz.prerequisiteIds)
   })

   it('creates Quiz with multiple Composites as prerequisites', async() => {
      const assessedItem = await stub.item()
      const preq1 = await stub.composite()
      const preq2 = await stub.composite()
      const quiz = {
         type: 'Quiz',
         assessedItemIds: [assessedItem.uuid],
         prerequisiteIds: [preq1.uuid, preq2.uuid],
         question: 'Multiple prerequisites ?',
         answers: YES_OR_NO
      }
      const created = await assessmentRepo.create(quiz)
      expect(created.prerequisites.map(preq => preq.uuid)).toEqual(quiz.prerequisiteIds)
   })

   it('creates Quiz with single activelyRecalledItem', async() => {
      const assessedItem = await stub.item()
      const actively = await stub.item()
      const quiz = {
         type: 'Quiz',
         assessedItemIds: [assessedItem.uuid],
         activelyRecalledItemIds: [actively.uuid],
         question: 'Single actively recalled Item ?',
         answers: YES_OR_NO
      }
      const created = await assessmentRepo.create(quiz)
      expect(created.activelyRecalledItems.map(i => i.uuid)).toEqual(quiz.activelyRecalledItemIds)
   })


   it('creates Quiz with multiple activelyRecalledItems', async() => {
      const assessedItem = await stub.item()
      const actively1 = await stub.item()
      const actively2 = await stub.item()
      const quiz = {
         type: 'Quiz',
         assessedItemIds: [assessedItem.uuid],
         activelyRecalledItemIds: [actively1.uuid, actively2.uuid],
         question: 'Single actively recalled Item ?',
         answers: YES_OR_NO
      }
      const created = await assessmentRepo.create(quiz)
      expect(created.activelyRecalledItems.map(i => i.uuid)).toEqual(quiz.activelyRecalledItemIds)
   })

   it('creates Quiz with single passivelyRecalledItem', async() => {
      const assessedItem = await stub.item()
      const passively = await stub.item()
      const quiz = {
         type: 'Quiz',
         assessedItemIds: [assessedItem.uuid],
         passivelyRecalledItemIds: [passively.uuid],
         question: 'Single actively recalled Item ?',
         answers: YES_OR_NO
      }
      const created = await assessmentRepo.create(quiz)
      expect(created.passivelyRecalledItems.map(i => i.uuid)).toEqual(quiz.passivelyRecalledItemIds)
   })

   it('creates Quiz with multiple passivelyRecalledItems', async() => {
      const assessedItem = await stub.item()
      const passively1 = await stub.item()
      const passively2 = await stub.item()
      const quiz = {
         type: 'Quiz',
         assessedItemIds: [assessedItem.uuid],
         passivelyRecalledItemIds: [passively1.uuid, passively2.uuid],
         question: 'Single actively recalled Item ?',
         answers: YES_OR_NO
      }
      const created = await assessmentRepo.create(quiz)
      expect(created.passivelyRecalledItems.map(i => i.uuid)).toEqual(quiz.passivelyRecalledItemIds)
   })

   describe('when creating complete Quiz', () => {
      let assessedItem
      let preq
      let actively
      let passively
      let quiz

      beforeEach(async() => {
         assessedItem = await stub.item()
         preq = await stub.composite()
         actively = await stub.item()
         passively = await stub.item()
         quiz = await assessmentRepo.create({
            type: 'Quiz',
            assessedItemIds: [assessedItem.uuid],
            prerequisiteIds: [preq.uuid],
            activelyRecalledItemIds: [actively.uuid],
            passivelyRecalledItemIds: [passively.uuid],
            question: 'Complete question ?',
            answers: YES_OR_NO
         })
      })

      it('creates Quiz', async() => {
         expect(quiz.prerequisites.length).toEqual(1)
         expect(quiz.activelyRecalledItems.length).toEqual(1)
         expect(quiz.passivelyRecalledItems.length).toEqual(1)
      })

      it('finds Quiz by uuid', async() => {
         const found = await assessmentRepo.find(quiz.uuid)
         expect(found.uuid).toEqual(quiz.uuid)
         expect(found.assessedItems[0].uuid).toEqual(assessedItem.uuid)
      })

   })

})

