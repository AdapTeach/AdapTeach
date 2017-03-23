import {cypher} from './graph/cypher'
import {UUID} from '../domain/UUID'
import {Objective} from '../domain/Objective'
import {Item} from '../domain/Item'
import {Composite} from '../domain/Composite'

const buildNameRegex = (name) => `(?i)${name}.*`

function buildItemSearchQuery(name) {
   const statement = `
    MATCH (item:Item) -[:IN_CATEGORY]-> (category)
    WHERE item.name  =~ {nameRegex}
    RETURN item, category`
   const nameRegex = buildNameRegex(name)
   const parameters = {nameRegex}
   return {statement, parameters}
}

function buildCompositeSearchQuery(name) {
   const statement = `
    MATCH (composite:Composite)
    WHERE composite.name  =~ {nameRegex}
    RETURN composite`
   const nameRegex = buildNameRegex(name)
   const parameters = {nameRegex}
   return {statement, parameters}
}

const find = async (uuid: UUID): Promise<Objective> => {
   // OPTIONAL MATCH (o) -[:IN_CATEGORY]-> (c)
   // OPTIONAL MATCH (c) -[:CHILD_OF*]-> (p)
   // OPTIONAL MATCH (o) -[:COMPOSED_OF]-> (item:Item) -[:IN_CATEGORY]-> (category:Category)
   // OPTIONAL MATCH (o) -[:COMPOSED_OF]-> (composite:Composite)
   // RETURN o, c, collect(p) as parents
   const statement = `
    MATCH (o:Objective {uuid: {uuid}}) 
    RETURN o`
   const records = await cypher.send(statement, {uuid})
   const record = records[0]
   return record.get('o').properties

}

const search = async (name: string): Promise<{ items: Item[], composites: Composite[] }> => {
   const statement = `
    MATCH (objective:Objective)
    WHERE objective.name =~ {nameRegex}
    OPTIONAL MATCH (objective) -[:IN_CATEGORY]-> (category)
    RETURN objective, category`
   const params = {
      nameRegex: buildNameRegex(name)
   }
   const records = await cypher.send(statement, params)
   const itemRecords = records.filter(record => record.get('category'))
   const compositeRecords = records.filter(record => !record.get('category'))
   const items = itemRecords.map(record => {
      const item = record.get('objective').properties
      item.category = record.get('category').properties
      return item
   })
   const composites = compositeRecords.map(record => record.get('objective').properties)
   return {items, composites}
}

export const objectiveRepo = {
   find,
   search
}
