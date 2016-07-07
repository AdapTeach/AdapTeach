const expect = require('expect')
const stub = require('./stub.data')
const itemRepo = require('./item')
const assessmentRepo = require('./assessment')

describe('Assessment API', () => {

  it('creates Assessment', function *() {
    const item = yield stub.item()
    const assessment = {
      name: 'Test Assessment',
      testedItemIds: [item.uuid]
    }
    const createdAssessment = yield assessmentRepo.create(assessment)
    expect(createdAssessment.uuid).toExist()
    expect(createdAssessment.name).toEqual(assessment.name)
    expect(createdAssessment.description).toEqual('')
    const itemIds = createdAssessment.testedItems.map(i => i.uuid)
    assessment.testedItemIds.forEach(itemId =>
      expect(itemIds).toInclude(itemId)
    )
  })

  describe('when assessment exists', () => {
    var assessment
    beforeEach(function *() {
      assessment = yield stub.assessment()
    })

    it('finds Assessment', function *() {
      const foundAssessment = yield assessmentRepo.find(assessment.uuid)
      expect(foundAssessment.uuid).toEqual(assessment.uuid)
      assessment.testedItems.forEach(item =>
        expect(foundAssessment.testedItems).toInclude(item)
      )
    })

  })

})

