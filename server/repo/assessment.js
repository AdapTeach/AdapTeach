var uuid = require('node-uuid');
var _ = require('lodash');

var cypher = require('./graph/cypher');

module.exports = {

    create: function *(assessment) {
        var statement = `
            CREATE (a:Assessment {uuid: {uuid}, name: {name}, description: {description}})
            WITH a
            UNWIND {testedItemIds} AS testedItemId
                MATCH (i:Item {uuid: testedItemId})
                CREATE (a) -[:ASSESSMENT_FOR]-> (i)
            RETURN a`;
        var parameters = {
            uuid: uuid.v4(),
            testedItemIds: assessment.testedItemIds,
            name: assessment.name,
            description: assessment.description
        };
        var result = yield cypher.send(statement, parameters);
        var createdAssessment = result[0].a;
        createdAssessment.testedItemIds = assessment.testedItemIds;
        return createdAssessment
    },

    find: function *(uuid) {
        var statement = 'MATCH (a:Assessment {uuid: {uuid}}) -[:ASSESSMENT_FOR]-> (i) RETURN a, collect(i) as testedItems';
        var result = yield cypher.send(statement, {uuid});
        var createdAssessment = result[0].a;
        createdAssessment.testedItemIds = _.map(result[0].testedItems, i => i.uuid);
        return createdAssessment
    }

};