import {cypher} from './graph/cypher'
import {UUID} from '../domain/UUID'
import {Objective} from '../domain/Objective'
import {Item} from '../domain/Item'
import {Composite} from '../domain/Composite'
import {buildNameRegex} from '../util/buildNameRegex'

const find = async (uuid: UUID): Promise<Objective> => {
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
    RETURN objective, category
    LIMIT 10`
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
