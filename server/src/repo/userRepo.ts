import * as uuid from 'uuid'
import {cypher} from './graph/cypher'

const create = async(userData) => {
   const statement = `
      CREATE (user:User {uuid: {uuid}, name: {name}})
      RETURN user`
   const parameters = Object.assign(userData, {
      uuid: uuid.v4()
   })
   const records = await cypher.send(statement, parameters)
   return records[0].get('user').properties
}

const addObjective = async(userId, objectiveId) => {
   const statement = `
    MATCH (user:User {uuid: {userId}})
    MATCH (objective:Objective {uuid: {objectiveId}})
    MERGE (user) -[:HAS_PERSONAL_OBJECTIVE]-> (objective)
    RETURN objective`
   const parameters = {userId, objectiveId}
   await cypher.send(statement, parameters)
}

const findObjectives = async(userId) => {
   const statement = `
    MATCH (user:User {uuid: {userId}}) -[:HAS_PERSONAL_OBJECTIVE]-> (objective:Objective)
    RETURN collect(objective) as objectives`
   const parameters = {userId}
   const records = await cypher.send(statement, parameters)
   return records[0].get('objectives').map(node => node.properties)
}

const removeObjective = async(userId, objectiveId) => {
   const statement = `
    MATCH (user:User) -[po:HAS_PERSONAL_OBJECTIVE]-> (objective:Objective)
    WHERE user.uuid = {userId}
    AND objective.uuid = {objectiveId}
    DELETE po`
   const parameters = {userId, objectiveId}
   await cypher.send(statement, parameters)
}

export const userRepo = {
   create,
   addObjective,
   findObjectives,
   removeObjective
}
