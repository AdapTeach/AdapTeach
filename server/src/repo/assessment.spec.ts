import { expect } from 'chai'
import { InvalidArgumentError } from '../error/InvalidArgumentError'
import { assessmentRepo } from './assessmentRepo'
import { stub } from './stubFactory'
import { AssessmentAnswer, AssessmentData } from '../domain/Assessment'

const YES_OR_NO: AssessmentAnswer[] = [
   { text: 'Yes', correct: true },
   { text: 'No', correct: false }
]

describe('Assessment API', () => {

   it('creates simplest possible Quiz (one assessedItem, YES/NO question)', async () => {
      const item = await stub.item()
      const quiz: AssessmentData = {
         type: 'Quiz',
         assessedItemIds: [item.uuid],
         question: 'Test Question ?',
         answers: YES_OR_NO
      }
      const created = await assessmentRepo.create(quiz)
      expect(created.uuid).to.exist
      expect(created.type).to.equal('Quiz')
      expect(created.assessedItems.map(i => i.uuid)).to.deep.equal(quiz.assessedItemIds)
      expect(created.prerequisites).to.deep.equal([])
      expect(created.activelyRecalledItems).to.deep.equal([])
      expect(created.passivelyRecalledItems).to.deep.equal([])
      expect(created.question).to.equal(quiz.question)
      expect(created.answers).to.deep.equal(quiz.answers)
   })

   it('finds simple Quiz by uuid', async () => {
      const item = await stub.item()
      const quiz: AssessmentData = {
         type: 'Quiz',
         assessedItemIds: [item.uuid],
         question: 'Test Question ?',
         answers: YES_OR_NO
      }
      const created = await assessmentRepo.create(quiz)
      const found = await assessmentRepo.find(created.uuid)
      expect(found).to.deep.equal(created)
   })

   it('prevents Assessment creation when type is not defined', async () => {
      const item = await stub.item()
      const lackingType = {
         assessedItemIds: [item.uuid],
         question: 'Lacking type ?',
         answers: YES_OR_NO
      } as AssessmentData
      try {
         await assessmentRepo.create(lackingType)
         throw Error('Should have failed')
      } catch (error) {
         expect(error).to.be.instanceof(InvalidArgumentError)
      }
   })

   it('creates Quiz with multiple assessedItems', async () => {
      const item1 = await stub.item()
      const item2 = await stub.item()
      const quiz: AssessmentData = {
         type: 'Quiz',
         assessedItemIds: [item1.uuid, item2.uuid],
         question: 'Multiple assessedItems ?',
         answers: YES_OR_NO
      }
      const created = await assessmentRepo.create(quiz)
      expect(created.assessedItems.map(i => i.uuid)).to.deep.equal(quiz.assessedItemIds)
   })

   it('creates Quiz with single Item as prerequisite', async () => {
      const assessedItem = await stub.item()
      const preq = await stub.item()
      const quiz: AssessmentData = {
         type: 'Quiz',
         assessedItemIds: [assessedItem.uuid],
         prerequisiteIds: [preq.uuid],
         question: 'Single prerequisite ?',
         answers: YES_OR_NO
      }
      const created = await assessmentRepo.create(quiz)
      expect(created.prerequisites.map(preq => preq.uuid)).to.deep.equal(quiz.prerequisiteIds)
   })

   it('creates Quiz with multiple Items as prerequisites', async () => {
      const assessedItem = await stub.item()
      const preq1 = await stub.item()
      const preq2 = await stub.item()
      const quiz: AssessmentData = {
         type: 'Quiz',
         assessedItemIds: [assessedItem.uuid],
         prerequisiteIds: [preq1.uuid, preq2.uuid],
         question: 'Multiple prerequisites ?',
         answers: YES_OR_NO
      }
      const created = await assessmentRepo.create(quiz)
      expect(created.prerequisites.map(preq => preq.uuid)).to.deep.equal(quiz.prerequisiteIds)
   })

   it('creates Quiz with single Composite as prerequisite', async () => {
      const assessedItem = await stub.item()
      const preq = await stub.composite()
      const quiz: AssessmentData = {
         type: 'Quiz',
         assessedItemIds: [assessedItem.uuid],
         prerequisiteIds: [preq.uuid],
         question: 'Single composite as prerequisite ?',
         answers: YES_OR_NO
      }
      const created = await assessmentRepo.create(quiz)
      expect(created.prerequisites.map(preq => preq.uuid)).to.deep.equal(quiz.prerequisiteIds)
   })

   it('creates Quiz with multiple Composites as prerequisites', async () => {
      const assessedItem = await stub.item()
      const preq1 = await stub.composite()
      const preq2 = await stub.composite()
      const quiz: AssessmentData = {
         type: 'Quiz',
         assessedItemIds: [assessedItem.uuid],
         prerequisiteIds: [preq1.uuid, preq2.uuid],
         question: 'Multiple prerequisites ?',
         answers: YES_OR_NO
      }
      const created = await assessmentRepo.create(quiz)
      expect(created.prerequisites.map(preq => preq.uuid)).to.deep.equal(quiz.prerequisiteIds)
   })

   it('creates Quiz with single activelyRecalledItem', async () => {
      const assessedItem = await stub.item()
      const actively = await stub.item()
      const quiz: AssessmentData = {
         type: 'Quiz',
         assessedItemIds: [assessedItem.uuid],
         activelyRecalledItemIds: [actively.uuid],
         question: 'Single actively recalled Item ?',
         answers: YES_OR_NO
      }
      const created = await assessmentRepo.create(quiz)
      expect(created.activelyRecalledItems.map(i => i.uuid)).to.deep.equal(quiz.activelyRecalledItemIds)
   })


   it('creates Quiz with multiple activelyRecalledItems', async () => {
      const assessedItem = await stub.item()
      const actively1 = await stub.item()
      const actively2 = await stub.item()
      const quiz: AssessmentData = {
         type: 'Quiz',
         assessedItemIds: [assessedItem.uuid],
         activelyRecalledItemIds: [actively1.uuid, actively2.uuid],
         question: 'Single actively recalled Item ?',
         answers: YES_OR_NO
      }
      const created = await assessmentRepo.create(quiz)
      expect(created.activelyRecalledItems.map(i => i.uuid)).to.deep.equal(quiz.activelyRecalledItemIds)
   })

   it('creates Quiz with single passivelyRecalledItem', async () => {
      const assessedItem = await stub.item()
      const passively = await stub.item()
      const quiz: AssessmentData = {
         type: 'Quiz',
         assessedItemIds: [assessedItem.uuid],
         passivelyRecalledItemIds: [passively.uuid],
         question: 'Single actively recalled Item ?',
         answers: YES_OR_NO
      }
      const created = await assessmentRepo.create(quiz)
      expect(created.passivelyRecalledItems.map(i => i.uuid)).to.deep.equal(quiz.passivelyRecalledItemIds)
   })

   it('creates Quiz with multiple passivelyRecalledItems', async () => {
      const assessedItem = await stub.item()
      const passively1 = await stub.item()
      const passively2 = await stub.item()
      const quiz: AssessmentData = {
         type: 'Quiz',
         assessedItemIds: [assessedItem.uuid],
         passivelyRecalledItemIds: [passively1.uuid, passively2.uuid],
         question: 'Single actively recalled Item ?',
         answers: YES_OR_NO
      }
      const created = await assessmentRepo.create(quiz)
      expect(created.passivelyRecalledItems.map(i => i.uuid)).to.deep.equal(quiz.passivelyRecalledItemIds)
   })

   describe('when creating complete Quiz', () => {
      let assessedItem
      let preq
      let actively
      let passively
      let quiz

      beforeEach(async () => {
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

      it('creates Quiz', async () => {
         expect(quiz.prerequisites.length).to.equal(1)
         expect(quiz.activelyRecalledItems.length).to.equal(1)
         expect(quiz.passivelyRecalledItems.length).to.equal(1)
      })

      it('finds Quiz by uuid', async () => {
         const found = await assessmentRepo.find(quiz.uuid)
         expect(found.uuid).to.equal(quiz.uuid)
         expect(found.assessedItems[0].uuid).to.equal(assessedItem.uuid)
      })

   })

})

