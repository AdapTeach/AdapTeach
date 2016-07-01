const expect = require('chai').expect

const quizAPI = require('./api/quizAPI')
const itemAPI = require('./api/itemAPI')
const compositeAPI = require('./api/compositeAPI')

const answers = [
  {text: 'Yes', correct: true},
  {text: 'No', correct: false}
]

describe('Quiz API', () => {

  it('creates simplest possible Quiz (one assessedItem, YES/NO question)', function *() {
    const quiz = yield quizAPI.create()
    expect(quiz.uuid).to.exist
    expect(quiz.prerequisites).to.exist
    expect(quiz.activelyRecalledItems).to.exist
    expect(quiz.passivelyRecalledItems).to.exist
  })

  it('creates Quiz with single assessedItem', function *() {
    const assessedItem = yield itemAPI.create()
    const quizData = {
      assessedItemIds: [assessedItem.uuid],
      question: 'Single assessedItem ?',
      answers
    }
    const quiz = yield quizAPI.create(quizData)
    expect(quiz.assessedItems.length).to.equal(1)
    expect(quiz.assessedItems[0].uuid).to.equal(assessedItem.uuid)
    expect(quiz.question).to.equal(quizData.question)
  })

  it('creates Quiz with multiple assessedItems', function *() {
    const assessedItem1 = yield itemAPI.create()
    const assessedItem2 = yield itemAPI.create()
    const quizData = {
      assessedItemIds: [assessedItem1.uuid, assessedItem2.uuid],
      question: 'Multiple assessedItems ?',
      answers
    }
    const quiz = yield quizAPI.create(quizData)
    expect(quiz.assessedItems.length).to.equal(2)
    expect(quiz.assessedItems.map(i => i.uuid))
      .to.contain(assessedItem1.uuid)
      .to.contain(assessedItem2.uuid)
  })

  it('creates Quiz with single Item as prerequisite', function *() {
    const assessedItem = yield itemAPI.create()
    const preq = yield itemAPI.create()
    const quizData = {
      assessedItemIds: [assessedItem.uuid],
      prerequisiteIds: [preq.uuid],
      question: 'Single prerequisite ?',
      answers
    }
    const quiz = yield quizAPI.create(quizData)
    expect(quiz.prerequisites.length).to.equal(1)
    expect(quiz.prerequisites[0].uuid).to.equal(preq.uuid)
  })

  it('creates Quiz with multiple Items as prerequisites', function *() {
    const assessedItem = yield itemAPI.create()
    const preq1 = yield itemAPI.create()
    const preq2 = yield itemAPI.create()
    const quizData = {
      assessedItemIds: [assessedItem.uuid],
      prerequisiteIds: [preq1.uuid, preq2.uuid],
      question: 'Multiple prerequisites ?',
      answers
    }
    const quiz = yield quizAPI.create(quizData)
    expect(quiz.prerequisites.length).to.equal(2)
    expect(quiz.prerequisites.map(p => p.uuid))
      .to.contain(preq1.uuid)
      .to.contain(preq2.uuid)
  })

  it('creates Quiz with single Composite as prerequisite', function *() {
    const assessedItem = yield itemAPI.create()
    const preq = yield compositeAPI.create()
    const quizData = {
      assessedItemIds: [assessedItem.uuid],
      prerequisiteIds: [preq.uuid],
      question: 'Single composite as prerequisite ?',
      answers
    }
    const quiz = yield quizAPI.create(quizData)
    expect(quiz.prerequisites.length).to.equal(1)
    expect(quiz.prerequisites[0].uuid).to.equal(preq.uuid)
  })

  it('creates Quiz with multiple Composites as prerequisites', function *() {
    const assessedItem = yield itemAPI.create()
    const preq1 = yield compositeAPI.create()
    const preq2 = yield compositeAPI.create()
    const quizData = {
      assessedItemIds: [assessedItem.uuid],
      prerequisiteIds: [preq1.uuid, preq2.uuid],
      question: 'Multiple prerequisites ?',
      answers
    }
    const quiz = yield quizAPI.create(quizData)
    expect(quiz.prerequisites.length).to.equal(2)
    expect(quiz.prerequisites.map(p => p.uuid))
      .to.contain(preq1.uuid)
      .to.contain(preq2.uuid)
  })

  it('creates Quiz with single activelyRecalledItem', function *() {
    const assessedItem = yield itemAPI.create()
    const actively = yield itemAPI.create()
    const quizData = {
      assessedItemIds: [assessedItem.uuid],
      activelyRecalledItemIds: [actively.uuid],
      question: 'Single actively recalled Item ?',
      answers
    }
    const quiz = yield quizAPI.create(quizData)
    expect(quiz.activelyRecalledItems.length).to.equal(1)
    expect(quiz.activelyRecalledItems[0].uuid).to.equal(actively.uuid)
  })

  it('creates Quiz with multiple activelyRecalledItems', function *() {
    const assessedItem = yield itemAPI.create()
    const actively1 = yield itemAPI.create()
    const actively2 = yield itemAPI.create()
    const quizData = {
      assessedItemIds: [assessedItem.uuid],
      activelyRecalledItemIds: [actively1.uuid, actively2.uuid],
      question: 'Multiple actively recalled Items ?',
      answers
    }
    const quiz = yield quizAPI.create(quizData)
    expect(quiz.activelyRecalledItems.length).to.equal(2)
    expect(quiz.activelyRecalledItems.map(i => i.uuid))
      .to.contain(actively1.uuid)
      .to.contain(actively2.uuid)
  })

  it('creates Quiz with single passivelyRecalledItem', function *() {
    const assessedItem = yield itemAPI.create()
    const passively = yield itemAPI.create()
    const quizData = {
      assessedItemIds: [assessedItem.uuid],
      passivelyRecalledItemIds: [passively.uuid],
      question: 'Single passively recalled Item ?',
      answers
    }
    const quiz = yield quizAPI.create(quizData)
    expect(quiz.passivelyRecalledItems.length).to.equal(1)
    expect(quiz.passivelyRecalledItems[0].uuid).to.equal(passively.uuid)
  })

  it('creates Quiz with multiple passivelyRecalledItems', function *() {
    const assessedItem = yield itemAPI.create()
    const passively1 = yield itemAPI.create()
    const passively2 = yield itemAPI.create()
    const quizData = {
      assessedItemIds: [assessedItem.uuid],
      passivelyRecalledItemIds: [passively1.uuid, passively2.uuid],
      question: 'Multiple passively recalled Items ?',
      answers
    }
    const quiz = yield quizAPI.create(quizData)
    expect(quiz.passivelyRecalledItems.length).to.equal(2)
    expect(quiz.passivelyRecalledItems.map(i => i.uuid))
      .to.contain(passively1.uuid)
      .to.contain(passively2.uuid)
  })

  describe('when creating complete Quiz', () => {
    var assessedItem
    var preq
    var actively
    var passively
    var quiz

    beforeEach(function *() {
      assessedItem = yield itemAPI.create()
      preq = yield compositeAPI.create()
      actively = yield itemAPI.create()
      passively = yield itemAPI.create()
      const quizData = {
        assessedItemIds: [assessedItem.uuid],
        prerequisiteIds: [preq.uuid],
        activelyRecalledItemIds: [actively.uuid],
        passivelyRecalledItemIds: [passively.uuid],
        question: 'Complete question ?',
        answers
      }
      quiz = yield quizAPI.create(quizData)
    })

    it('creates Quiz', function *() {
      expect(quiz.prerequisites.length).to.equal(1)
      expect(quiz.activelyRecalledItems.length).to.equal(1)
      expect(quiz.passivelyRecalledItems.length).to.equal(1)
    })

    it('finds Quiz by uuid', function *() {
      const found = yield quizAPI.find(quiz.uuid)
      expect(found.uuid).to.equal(quiz.uuid)
      expect(found.assessedItems[0].uuid).to.equal(assessedItem.uuid)
    })

  })

})
