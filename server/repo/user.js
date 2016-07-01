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

module.exports = {
  addObjective
}
