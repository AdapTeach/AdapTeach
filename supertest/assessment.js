const expect = require('chai').expect

const itemAPI = require('./api/itemAPI')
const assessmentAPI = require('./api/assessmentAPI')

describe('Assessment API', () => {

  it('creates Assessment', function *() {
    const assessment = {
      name: 'Assessment to create',
      description: 'Whatever'
    }
    const createdAssessment = yield assessmentAPI.create(assessment)
    expect(createdAssessment.uuid).to.exist
    expect(createdAssessment.name).to.equal(assessment.name)
    expect(createdAssessment.description).to.equal(assessment.description)
    assessment.testedItemIds.forEach(itemId =>
      expect(createdAssessment.testedItemIds).to.contain(itemId)
    )
  })

  it('finds Assessment', function *() {
    const assessment = yield assessmentAPI.create()

    const foundAssessment = yield assessmentAPI.find(assessment.uuid)
    expect(foundAssessment.uuid).to.equal(assessment.uuid)
    assessment.testedItemIds.forEach(itemId =>
      expect(foundAssessment.testedItemIds).to.contain(itemId)
    )
  })

  it('adds prerequisite', function *() {
    const assessment = yield assessmentAPI.create()
    const preq = itemAPI.create()

    yield assessmentAPI.prerequisites.add(assessment, preq)
  })

  xit('finds prerequisites', function *() {
    const assessment = yield assessmentAPI.create()
    const preq = itemAPI.create()
    yield assessmentAPI.prerequisites.add(assessment, preq)

    const preqs = yield assessmentAPI.prerequisites.findFor(assessment)
    expect(preqs).to.contain(preq)
  })

})
