const uuid = require('node-uuid')

const cypher = require('./graph/cypher')
const InvalidArgumentError = require('../error/invalid-argument')

const create = function *(quizData) {
  const statement = `
    CREATE (q:Quiz {uuid: {uuid}, question: {question}})
    WITH q
    UNWIND {assessedItemIds} AS assessedItemId
      MATCH (i:Item {uuid: assessedItemId})
      CREATE (q) -[:ASSESSMENT_FOR]-> (i)
    WITH q, collect(i) as assessedItems
    UNWIND {prerequisiteIds} AS prerequisiteId
      MATCH (o:Objective {uuid: prerequisiteId})
      CREATE (q) -[:REQUIRES]-> (o)
    RETURN q, assessedItems, collect(o) as prerequisites`
  const parameters = {
    uuid: uuid.v4(),
    question: quizData.question,
    assessedItemIds: quizData.assessedItemIds,
    prerequisiteIds: quizData.prerequisiteIds
  }
  const result = yield cypher.send(statement, parameters)
  const row = result[0]
  const quiz = row.q
  quiz.assessedItems = row.assessedItems
  quiz.prerequisites = row.prerequisites
  return quiz;
}

const find = function *(uuid) {
  const statement = `
    MATCH (q:Quiz {uuid: {uuid}})
    RETURN q`
  const result = yield cypher.send(statement, {uuid})
  const row = result[0]
  if (!row) throw new InvalidArgumentError(`No Quiz found for id ${uuid}`)
  return row.q
}

module.exports = {
  create,
  find
}
