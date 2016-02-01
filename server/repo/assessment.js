const uuid = require('node-uuid');
const _ = require('lodash');

const cypher = require('./graph/cypher');

const create = function *(assessment) {
  const statement = `
            CREATE (a:Assessment {uuid: {uuid}, name: {name}, description: {description}})
            WITH a
            UNWIND {testedItemIds} AS testedItemId
                MATCH (i:Item {uuid: testedItemId})
                CREATE (a) -[:ASSESSMENT_FOR]-> (i)
            RETURN a`;
  const parameters = {
    uuid: uuid.v4(),
    testedItemIds: assessment.testedItemIds,
    name: assessment.name,
    description: assessment.description
  };
  const result = yield cypher.send(statement, parameters);
  const createdAssessment = result[0].a;
  createdAssessment.testedItemIds = assessment.testedItemIds;
  return createdAssessment
};

const find = function *(uuid) {
  const statement = 'MATCH (a:Assessment {uuid: {uuid}}) -[:ASSESSMENT_FOR]-> (i) RETURN a, collect(i) as testedItems';
  const result = yield cypher.send(statement, {uuid});
  const createdAssessment = result[0].a;
  createdAssessment.testedItemIds = _.map(result[0].testedItems, i => i.uuid);
  return createdAssessment
};

module.exports = {
  create,
  find
};
