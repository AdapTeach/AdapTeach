const expect = require('expect')
const stub = require('./stub.data')
const assessmentRepo = require('./assessment')
const InvalidArgumentError = require('../error/invalid-argument')

const YES_OR_NO = [
  {text: 'Yes', correct: true},
  {text: 'No', correct: false}
]

describe('Assessment API', () => {

  it('creates simplest possible Quiz (one assessedItem, YES/NO question)', function *() {
    const item = yield stub.item()
    const quiz = {
      type: 'Quiz',
      assessedItemIds: [item.uuid],
      question: 'Test Question ?',
      answers: YES_OR_NO
    }
    const created = yield assessmentRepo.create(quiz)
    expect(created.uuid).toExist()
    expect(created.type).toEqual('Quiz')
    expect(created.assessedItems.map(i => i.uuid)).toEqual(quiz.assessedItemIds)
    expect(created.prerequisites).toExist()
    expect(created.activelyRecalledItems).toExist()
    expect(created.passivelyRecalledItems).toExist()
    expect(created.question).toEqual(quiz.question)
    expect(created.answers).toEqual(quiz.answers)
  })

  it('prevents Assessment creation when type is not defined', function *() {
    const item = yield stub.item()
    const lackingType = {
      assessedItemIds: [item.uuid],
      question: 'Lacking type ?',
      answers: YES_OR_NO
    }
    try {
      yield assessmentRepo.create(lackingType)
      throw Error('Should have failed')
    } catch (error) {
      expect(error).toBeA(InvalidArgumentError)
    }
  })

  it('creates Quiz with multiple assessedItems', function *() {
    const item1 = yield stub.item()
    const item2 = yield stub.item()
    const quiz = {
      type: 'Quiz',
      assessedItemIds: [item1.uuid, item2.uuid],
      question: 'Multiple assessedItems ?',
      answers: YES_OR_NO
    }
    const created = yield assessmentRepo.create(quiz)
    expect(created.assessedItems.map(i => i.uuid)).toEqual(quiz.assessedItemIds)
  })

  it('creates Quiz with single Item as prerequisite', function *() {
    const assessedItem = yield stub.item()
    const preq = yield stub.item()
    const quiz = {
      type: 'Quiz',
      assessedItemIds: [assessedItem.uuid],
      prerequisiteIds: [preq.uuid],
      question: 'Single prerequisite ?',
      answers: YES_OR_NO
    }
    const created = yield assessmentRepo.create(quiz)
    expect(created.prerequisites.map(preq => preq.uuid)).toEqual(quiz.prerequisiteIds)
  })

  it('creates Quiz with multiple Items as prerequisites', function *() {
    const assessedItem = yield stub.item()
    const preq1 = yield stub.item()
    const preq2 = yield stub.item()
    const quiz = {
      type: 'Quiz',
      assessedItemIds: [assessedItem.uuid],
      prerequisiteIds: [preq1.uuid, preq2.uuid],
      question: 'Multiple prerequisites ?',
      answers: YES_OR_NO
    }
    const created = yield assessmentRepo.create(quiz)
    expect(created.prerequisites.map(preq => preq.uuid)).toEqual(quiz.prerequisiteIds)
  })

  it('creates Quiz with single Composite as prerequisite', function *() {
    const assessedItem = yield stub.item()
    const preq = yield stub.composite()
    const quiz = {
      type: 'Quiz',
      assessedItemIds: [assessedItem.uuid],
      prerequisiteIds: [preq.uuid],
      question: 'Single composite as prerequisite ?',
      answers: YES_OR_NO
    }
    const created = yield assessmentRepo.create(quiz)
    expect(created.prerequisites.map(preq => preq.uuid)).toEqual(quiz.prerequisiteIds)
  })

  it('creates Quiz with multiple Composites as prerequisites', function *() {
    const assessedItem = yield stub.item()
    const preq1 = yield stub.composite()
    const preq2 = yield stub.composite()
    const quiz = {
      type: 'Quiz',
      assessedItemIds: [assessedItem.uuid],
      prerequisiteIds: [preq1.uuid, preq2.uuid],
      question: 'Multiple prerequisites ?',
      answers: YES_OR_NO
    }
    const created = yield assessmentRepo.create(quiz)
    expect(created.prerequisites.map(preq => preq.uuid)).toEqual(quiz.prerequisiteIds)
  })

  it('creates Quiz with single activelyRecalledItem', function *() {
    const assessedItem = yield stub.item()
    const actively = yield stub.item()
    const quiz = {
      type: 'Quiz',
      assessedItemIds: [assessedItem.uuid],
      activelyRecalledItemIds: [actively.uuid],
      question: 'Single actively recalled Item ?',
      answers: YES_OR_NO
    }
    const created = yield assessmentRepo.create(quiz)
    expect(created.activelyRecalledItems.map(i => i.uuid)).toEqual(quiz.activelyRecalledItemIds)
  })


  it('creates Quiz with multiple activelyRecalledItems', function *() {
    const assessedItem = yield stub.item()
    const actively1 = yield stub.item()
    const actively2 = yield stub.item()
    const quiz = {
      type: 'Quiz',
      assessedItemIds: [assessedItem.uuid],
      activelyRecalledItemIds: [actively1.uuid, actively2.uuid],
      question: 'Single actively recalled Item ?',
      answers: YES_OR_NO
    }
    const created = yield assessmentRepo.create(quiz)
    expect(created.activelyRecalledItems.map(i => i.uuid)).toEqual(quiz.activelyRecalledItemIds)
  })

  it('creates Quiz with single passivelyRecalledItem', function *() {
    const assessedItem = yield stub.item()
    const passively = yield stub.item()
    const quiz = {
      type: 'Quiz',
      assessedItemIds: [assessedItem.uuid],
      passivelyRecalledItemIds: [passively.uuid],
      question: 'Single actively recalled Item ?',
      answers: YES_OR_NO
    }
    const created = yield assessmentRepo.create(quiz)
    expect(created.passivelyRecalledItems.map(i => i.uuid)).toEqual(quiz.passivelyRecalledItemIds)
  })

  it('creates Quiz with multiple passivelyRecalledItems', function *() {
    const assessedItem = yield stub.item()
    const passively1 = yield stub.item()
    const passively2 = yield stub.item()
    const quiz = {
      type: 'Quiz',
      assessedItemIds: [assessedItem.uuid],
      passivelyRecalledItemIds: [passively1.uuid, passively2.uuid],
      question: 'Single actively recalled Item ?',
      answers: YES_OR_NO
    }
    const created = yield assessmentRepo.create(quiz)
    expect(created.passivelyRecalledItems.map(i => i.uuid)).toEqual(quiz.passivelyRecalledItemIds)
  })

  describe('when creating complete Quiz', () => {
    var assessedItem
    var preq
    var actively
    var passively
    var quiz

    beforeEach(function *() {
      assessedItem = yield stub.item()
      preq = yield stub.composite()
      actively = yield stub.item()
      passively = yield stub.item()
      quiz = yield assessmentRepo.create({
        type: 'Quiz',
        assessedItemIds: [assessedItem.uuid],
        prerequisiteIds: [preq.uuid],
        activelyRecalledItemIds: [actively.uuid],
        passivelyRecalledItemIds: [passively.uuid],
        question: 'Complete question ?',
        answers: YES_OR_NO
      })
    })

    it('creates Quiz', function *() {
      expect(quiz.prerequisites.length).toEqual(1)
      expect(quiz.activelyRecalledItems.length).toEqual(1)
      expect(quiz.passivelyRecalledItems.length).toEqual(1)
    })

    it('finds Quiz by uuid', function *() {
      const found = yield assessmentRepo.find(quiz.uuid)
      expect(found.uuid).toEqual(quiz.uuid)
      expect(found.assessedItems[0].uuid).toEqual(assessedItem.uuid)
    })

  })

})

