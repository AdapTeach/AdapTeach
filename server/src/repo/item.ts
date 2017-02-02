import * as uuid from 'node-uuid'
import {InvalidArgumentError} from '../error/InvalidArgumentError'
import {cypher} from './graph/cypher'

const addParentHierarchyToCategory = require('./util').addParentHierarchyToCategory

function itemFromRecord(row) {
  const item = row.get('i').properties
  item.category = row.get('c').properties
  const parents = row.get('parents').map(node => node.properties)
  addParentHierarchyToCategory(item.category, parents)
  return item
}

const create = async(itemData) => {
  if (!itemData.categoryId) throw new InvalidArgumentError('item.categoryId is required')
  const statement = `
    MATCH (c:Category {uuid: {categoryId}})
    CREATE (i:Item:Objective {uuid: {uuid}, name: {name}, description: {description}}) -[:IN_CATEGORY]-> (c)
    WITH i, c
    OPTIONAL MATCH (c) -[:CHILD_OF*]-> (p)
    RETURN i, c, collect(p) as parents`
  const parameters = {
    categoryId: itemData.categoryId,
    uuid: uuid.v4(),
    name: itemData.name,
    description: itemData.description ? itemData.description : ''
  }
  const records = await cypher.send(statement, parameters)
  const record = records[0]
  if (!record) throw new InvalidArgumentError(`No Category exists for id ${itemData.categoryId}`)
  return itemFromRecord(record)
}

const find = function *(uuid) {
  const statement = `
    MATCH (i:Item {uuid: {uuid}}) -[:IN_CATEGORY]-> (c)
    OPTIONAL MATCH (c) -[:CHILD_OF*]-> (p)
    RETURN i, c, collect(p) as parents`
  const result = yield cypher.send(statement, {uuid})
  const row = result[0]
  if (!row) throw new InvalidArgumentError(`No Item found for id ${uuid}`)
  return itemFromRecord(row)
}

module.exports = {
  create,
  find
}
