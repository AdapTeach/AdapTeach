const cypher = require('./graph/cypher')

const addObjective = function *(userId, objectiveId) {
  const statement = `
    MATCH (user:User {uuid: {userId}})
    MATCH (objective:Objective {uuid: {objectiveId}})
    MERGE (user) -[:HAS_PERSONAL_OBJECTIVE]-> (objective)
    RETURN objective`
  const parameters = {userId, objectiveId}
  const result = yield cypher.send(statement, parameters)
  return result[0].objective
}

const findObjectives = function *(userId) {
  const statement = `
    MATCH (user:User {uuid: {userId}}) -[:HAS_PERSONAL_OBJECTIVE]-> (objective:Objective)
    RETURN collect(objective) as objectives`
  const parameters = {userId}
  const result = yield cypher.send(statement, parameters)
  return result[0].objectives
}

const removeObjective = function *(userId, objectiveId) {
  const statement = `
    MATCH (user:User {uuid: {userId}})
    MATCH (objective:Objective {uuid: {objectiveId}})
    MATCH (user) -[po:HAS_PERSONAL_OBJECTIVE]-> (objective)
    DELETE po
    RETURN objective`
  const parameters = {userId, objectiveId}
  yield cypher.send(statement, parameters)
}

module.exports = {
  addObjective,
  findObjectives,
  removeObjective
}
