const uuid = require('node-uuid')

const cypher = require('./graph/cypher')
const InvalidArgumentError = require('../error/invalid-argument')

var quizFromRow = function (row) {
  var quiz = {
    prerequisites: [],
    activelyRecalledItems: [],
    passivelyRecalledItems: []
  }
  Object.assign(quiz,
    row.q,
    row,
    {answers: JSON.parse(row.q.answers)}
  )
  delete quiz.q
  return quiz;
};

const create = function *(quizData) {
  ////////////////////
  // PREREQUISITES //
  //////////////////
  var createPrerequisiteRelationships = ''
  var prerequisites = ''
  if (quizData.prerequisiteIds && quizData.prerequisiteIds.length > 0) {
    createPrerequisiteRelationships = `
    UNWIND {prerequisiteIds} AS prerequisiteId
      MATCH (preq:Objective {uuid: prerequisiteId})
      CREATE (q) -[:REQUIRES]-> (preq)
    WITH q, assessedItems, collect(preq) as prerequisites`
    prerequisites = ', prerequisites'
  }

  //////////////////////////////
  // ACTIVELY RECALLED ITEMS //
  ////////////////////////////
  var createActivelyRecalledItemRelationships = ''
  var activelyRecalledItems = ''
  if (quizData.activelyRecalledItemIds && quizData.activelyRecalledItemIds.length > 0) {
    createActivelyRecalledItemRelationships = `
    UNWIND {activelyRecalledItemIds} AS activelyRecalledItemId
      MATCH (actively:Item {uuid: activelyRecalledItemId})
      CREATE (q) -[:ACTIVELY_RECALLS]-> (actively)
    WITH q, assessedItems, collect(actively) as activelyRecalledItems ${prerequisites}`
    activelyRecalledItems = ', activelyRecalledItems'
  }

  ///////////////////////////////
  // PASSIVELY RECALLED ITEMS //
  /////////////////////////////
  var createPassivelyRecalledItemRelationships = ''
  var passivelyRecalledItems = ''
  if (quizData.passivelyRecalledItemIds && quizData.passivelyRecalledItemIds.length > 0) {
    createPassivelyRecalledItemRelationships = `
    UNWIND {passivelyRecalledItemIds} AS passivelyRecalledItemId
      MATCH (passively:Item {uuid: passivelyRecalledItemId})
      CREATE (q) -[:PASSIVELY_RECALLS]-> (passively)`
    passivelyRecalledItems = ', collect(passively) as passivelyRecalledItems'
  }

  const statement = `
    CREATE (q:Quiz {uuid: {uuid}, question: {question}, answers: {answers}})
    WITH q
    UNWIND {assessedItemIds} AS assessedItemId
      MATCH (i:Item {uuid: assessedItemId})
      CREATE (q) -[:ASSESSMENT_FOR]-> (i)
    WITH q, collect(i) as assessedItems
    ${createPrerequisiteRelationships}
    ${createActivelyRecalledItemRelationships}
    ${createPassivelyRecalledItemRelationships}
    RETURN q, assessedItems ${prerequisites} ${activelyRecalledItems} ${passivelyRecalledItems}`
  const parameters = Object.assign(
    {uuid: uuid.v4()},
    quizData,
    {answers: JSON.stringify(quizData.answers)}
  )
  const result = yield cypher.send(statement, parameters)
  const row = result[0]
  return quizFromRow(row);
}
const find = function *(uuid) {
  const statement = `
    MATCH (q:Quiz {uuid: {uuid}}) -[:ASSESSMENT_FOR*]-> (assessed:Item)
    OPTIONAL MATCH (q) -[:REQUIRES]-> (preq:Objective)
    OPTIONAL MATCH (q) -[:ACTIVELY_RECALLS]-> (actively:Item)
    OPTIONAL MATCH (q) -[:PASSIVELY_RECALLS]-> (passively:Item)
    RETURN q, collect(assessed) as assessedItems, collect(preq) as prerequisites,
           collect(actively) as activelyRecalledItems, collect(passively) as passivelyRecalledItems`
  const result = yield cypher.send(statement, {uuid})
  const row = result[0]
  if (!row) throw new InvalidArgumentError(`No Quiz found for id ${uuid}`)
  return quizFromRow(row)
}

module.exports = {
  create,
  find
}
