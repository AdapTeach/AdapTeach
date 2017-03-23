import * as uuid from 'uuid'
import {InvalidArgumentError} from '../error/InvalidArgumentError'
import {cypher} from './graph/cypher'
import {Composite, CompositeFields} from '../domain/Composite'
import {UUID} from '../domain/UUID'
import {COMPOSITE, ITEM, ObjectiveType} from '../domain/Objective'

function compositeFromRecord(record) {
   const composite = record.get('c').properties
   const subObjectiveNodes = record.keys.indexOf('subObjectives') >= 0 ? record.get('subObjectives') : []
   const subObjectives = subObjectiveNodes.map(node => {
      const type: ObjectiveType = node.labels.includes(ITEM) ? ITEM : node.labels.includes(COMPOSITE) && COMPOSITE
      return {...node.properties, type}
   })
   // TODO Add categories to Composite ?
   // const categoryNodes = record.keys.indexOf('categories') >= 0 ? record.get('categories') : []
   // const categories = categoryNodes.map(node => node.properties)
   return {
      ...composite,
      type: COMPOSITE,
      subObjectives
   }
}

const create = async (fields: CompositeFields): Promise<Composite> => {
   if (!fields.name) throw new InvalidArgumentError('Name is missing on Composite to create')
   let statement = `
    CREATE (c:Composite:Objective {uuid: {uuid}, name: {name}, description: {description}})
    RETURN c`
   // We're making sure the subObjectives array is NOT empty, in which case using the second query
   // will result in the created Composite not being returned
   // TODO Add categories ? otherwise remove MATCH clause
   if (fields.subObjectives && fields.subObjectives.length > 0) statement = `
    CREATE (c:Composite:Objective {uuid: {uuid}, name: {name}, description: {description}})
    WITH c
    UNWIND {subObjectives} AS componentId
      MATCH (o:Objective {uuid: componentId})
      CREATE (c) -[:COMPOSED_OF]-> (o)
    WITH c
    OPTIONAL MATCH (c) -[:COMPOSED_OF]-> (subObjective:Objective)
    OPTIONAL MATCH (c) -[:COMPOSED_OF*]-> (:Objective) -[:IN_CATEGORY]-> (category:Category)
    RETURN c, collect(DISTINCT subObjective) as subObjectives, collect(DISTINCT category) as categories`
   const parameters = {
      uuid: uuid.v4(),
      ...fields
   }
   const result = await cypher.send(statement, parameters)
   return compositeFromRecord(result[0])
}

const find = async (uuid: UUID): Promise<Composite> => {
   // TODO Add categories ? otherwise remove MATCH clause
   const statement = `
    MATCH (c:Composite {uuid: {uuid}})
    OPTIONAL MATCH (c) -[:COMPOSED_OF]-> (subObjective:Objective)
    OPTIONAL MATCH (c) -[:COMPOSED_OF*]-> (:Objective) -[:IN_CATEGORY]-> (category:Category)
    RETURN c, collect(DISTINCT subObjective) as subObjectives, collect(DISTINCT category) as categories`
   const result = await cypher.send(statement, {uuid})
   return compositeFromRecord(result[0])
}

export const compositeRepo = {
   create,
   find
}
