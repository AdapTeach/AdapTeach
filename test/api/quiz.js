const expect = require('chai').expect

const quizAPI = require('./util/quizAPI')
const itemAPI = require('./util/itemAPI')

describe('Quiz API', () => {
  var quizData
  var quiz
  var item
  var preq

  beforeEach(function *() {
    item = yield itemAPI.create()
    preq = yield itemAPI.create()
    quizData = {
      question: 'What is this Quiz ?',
      assessedItemIds: [item.uuid],
      prerequisiteIds: [preq.uuid]
    }
    quiz = yield quizAPI.create(quizData)
  })

  it('creates Quiz with single assessed Item', function *() {
    expect(quiz.uuid).to.exist
    expect(quiz.question).to.equal(quizData.question)
    expect(quiz.assessedItems).to.exist
    expect(quiz.assessedItems.length).to.equal(1)
    expect(quiz.assessedItems[0].uuid).to.equal(item.uuid)
  })

  it('creates Quiz with single Item as prerequisite', function *() {
    expect(quiz.prerequisites.length).to.equal(1)
    expect(quiz.prerequisites[0].uuid).to.equal(preq.uuid)
  })

  it('finds Quiz by uuid', function *() {
    const found = yield quizAPI.find(quiz.uuid)
    expect(found).to.exist
  });

})
