const uuid = require('node-uuid')

const cypher = require('./graph/cypher')

const create = function *(assessment) {
  const statement = `
    CREATE (a:Assessment {uuid: {uuid}, name: {name}, description: {description}})
    WITH a
    UNWIND {testedItemIds} AS testedItemId
      MATCH (i:Item {uuid: testedItemId})
      CREATE (a) -[:ASSESSMENT_FOR]-> (i)
    RETURN a, collect(i) as testedItems`
  const parameters = {
    uuid: uuid.v4(),
    testedItemIds: assessment.testedItemIds,
    name: assessment.name,
    description: assessment.description || ''
  }
  const records = yield cypher.send(statement, parameters)
  const createdAssessment = records[0].get('a').properties
  createdAssessment.testedItems = records[0].get('testedItems').map(i => i.properties)
  return createdAssessment
}

const find = function *(uuid) {
  const statement = `
    MATCH (a:Assessment {uuid: {uuid}}) -[:ASSESSMENT_FOR]-> (i:Item)
    RETURN a, collect(i) as testedItems`
  const records = yield cypher.send(statement, {uuid})
  const createdAssessment = records[0].get('a').properties
  createdAssessment.testedItems = records[0].get('testedItems').map(i => i.properties)
  return createdAssessment
}

module.exports = {
  create,
  find
}
