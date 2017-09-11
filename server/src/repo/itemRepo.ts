import * as uuid from 'uuid'
import {InvalidArgumentError} from '../error/InvalidArgumentError'
import {cypher} from './graph/cypher'
import {addParentHierarchyToCategory} from './util/addParentHierarchyToCategory'
import {Item, ItemFields} from '../domain/Item'
import {UUID} from '../domain/UUID'
import {ITEM} from '../domain/Objective'
import {buildNameRegex} from '../util/buildNameRegex'

function itemFromRecord(row) {
   const item = row.get('i').properties
   item.type = ITEM
   item.category = row.get('c').properties
   const parents = row.get('parents').map(node => node.properties)
   addParentHierarchyToCategory(item.category, parents)
   return item
}

const create = async (fields: ItemFields): Promise<Item> => {
   if (!fields.category) throw new InvalidArgumentError('item.category is required')
   const statement = `
    MATCH (c:Category {uuid: {category}})
    CREATE (i:Item:Objective {uuid: {uuid}, name: {name}, description: {description}}) -[:IN_CATEGORY]-> (c)
    WITH i, c
    OPTIONAL MATCH (c) -[:CHILD_OF*]-> (p)
    RETURN i, c, collect(p) as parents`
   const parameters = {
      uuid: uuid.v4(),
      ...fields
   }
   const records = await cypher.send(statement, parameters)
   const record = records[0]
   if (!record) throw new InvalidArgumentError(`No Category exists for id ${fields.category}`)
   return itemFromRecord(record)
}

const find = async (uuid: UUID): Promise<Item> => {
   const statement = `
    MATCH (i:Item {uuid: {uuid}}) -[:IN_CATEGORY]-> (c)
    OPTIONAL MATCH (c) -[:CHILD_OF*]-> (p)
    RETURN i, c, collect(p) as parents`
   const result = await cypher.send(statement, {uuid})
   const row = result[0]
   if (!row) throw new InvalidArgumentError(`No Item found for id ${uuid}`)
   return itemFromRecord(row)
}

const search = async (name: string): Promise<Item[]> => {
   const statement = `
    MATCH (item:Item) -[:IN_CATEGORY]-> (category)
    WHERE item.name =~ {nameRegex}
    RETURN item, category
    LIMIT 10`
   const params = {
      nameRegex: buildNameRegex(name)
   }
   const records = await cypher.send(statement, params)
   const items = records.map(record => {
      const item = record.get('item').properties
      item.category = record.get('category').properties
      return item
   })
   return items
}

export const itemRepo = {
   create,
   find,
   search
}
