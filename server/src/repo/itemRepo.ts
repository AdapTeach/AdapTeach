import * as uuid from 'uuid'
import {InvalidArgumentError} from '../error/InvalidArgumentError'
import {cypher} from './graph/cypher'
import {addParentHierarchyToCategory} from './util/addParentHierarchyToCategory'
import {ItemFields} from '../domain/ItemFields'

function itemFromRecord(row) {
   const item = row.get('i').properties
   item.category = row.get('c').properties
   const parents = row.get('parents').map(node => node.properties)
   addParentHierarchyToCategory(item.category, parents)
   return item
}

const create = async(itemData: ItemFields) => {
   if (!itemData.category) throw new InvalidArgumentError('item.category is required')
   const statement = `
    MATCH (c:Category {uuid: {categoryId}})
    CREATE (i:Item:Objective {uuid: {uuid}, name: {name}, description: {description}}) -[:IN_CATEGORY]-> (c)
    WITH i, c
    OPTIONAL MATCH (c) -[:CHILD_OF*]-> (p)
    RETURN i, c, collect(p) as parents`
   const parameters = {
      categoryId: itemData.category,
      uuid: uuid.v4(),
      name: itemData.name,
      description: itemData.description ? itemData.description : ''
   }
   const records = await cypher.send(statement, parameters)
   const record = records[0]
   if (!record) throw new InvalidArgumentError(`No Category exists for id ${itemData.category}`)
   return itemFromRecord(record)
}

const find = async(uuid) => {
   const statement = `
    MATCH (i:Item {uuid: {uuid}}) -[:IN_CATEGORY]-> (c)
    OPTIONAL MATCH (c) -[:CHILD_OF*]-> (p)
    RETURN i, c, collect(p) as parents`
   const result = await cypher.send(statement, {uuid})
   const row = result[0]
   if (!row) throw new InvalidArgumentError(`No Item found for id ${uuid}`)
   return itemFromRecord(row)
}

export const itemRepo = {
   create,
   find
}
