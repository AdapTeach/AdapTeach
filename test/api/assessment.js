var expect = require('chai').expect;

var assessmentAPI = require('./util/assessmentAPI');

describe('Assessment API', function () {

    it('creates Assessment', function *() {
        const assessment = {
            name: 'Assessment to create',
            description: 'Whatever'
        };
        var createdAssessment = yield assessmentAPI.create(assessment);
        expect(createdAssessment.uuid).to.exist;
        expect(createdAssessment.name).to.equal(assessment.name);
        expect(createdAssessment.description).to.equal(assessment.description);
        assessment.testedItemIds.forEach(itemId =>
            expect(createdAssessment.testedItemIds).to.contain(itemId)
        );
    });

    it('finds Assessment', function *() {
        const assessment = yield assessmentAPI.create();

        const foundAssessment = yield assessmentAPI.find(assessment.uuid);
        expect(foundAssessment.uuid).to.equal(assessment.uuid);
        assessment.testedItemIds.forEach(itemId =>
            expect(foundAssessment.testedItemIds).to.contain(itemId)
        );
    });

});