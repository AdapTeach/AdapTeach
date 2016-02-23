const uuid = require('node-uuid')

const cypher = require('./graph/cypher')
const InvalidArgumentError = require('../error/invalid-argument')
const addParentHierarchyToCategory = require('./util').addParentHierarchyToCategory

function itemFromRow(row) {
  const item = row.i
  item.category = row.c
  const parents = row.parents
  addParentHierarchyToCategory(item.category, parents)
  return item;
}
const create = function *(itemData) {
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
  const result = yield cypher.send(statement, parameters)
  const row = result[0]
  if (!row) throw new InvalidArgumentError(`No Category exists for id ${itemData.categoryId}`)
  return itemFromRow(row)
}

const find = function *(uuid) {
  const statement = `
    MATCH (i:Item {uuid: {uuid}}) -[:IN_CATEGORY]-> (c)
    OPTIONAL MATCH (c) -[:CHILD_OF*]-> (p)
    RETURN i, c, collect(p) as parents`
  const result = yield cypher.send(statement, {uuid})
  const row = result[0]
  if (!row) throw new InvalidArgumentError(`No Item found for id ${uuid}`)
  return itemFromRow(row)
}

module.exports = {
  create,
  find
}
