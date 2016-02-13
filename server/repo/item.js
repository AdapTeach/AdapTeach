const uuid = require('node-uuid')

const cypher = require('./graph/cypher')
const InvalidArgumentError = require('../error/invalid-argument')

const create = function *(item) {
  if (!item.categoryId) throw new InvalidArgumentError('item.categoryId is required')
  const statement = `
    MATCH (c:Category {uuid: {categoryId}})
    CREATE (i:Item:Objective {uuid: {uuid}, name: {name}, description: {description}}) -[:IN_CATEGORY]-> (c)
    RETURN i, c`
  const parameters = {
    categoryId: item.categoryId,
    uuid: uuid.v4(),
    name: item.name,
    description: item.description ? item.description : ''
  }
  const result = yield cypher.send(statement, parameters)
  const row = result[0]
  if (!row) throw new InvalidArgumentError(`No Category exists for id ${item.categoryId}`)
  const createdItem = row.i
  createdItem.categoryId = row.c.uuid
  return createdItem
}

const find = function *(uuid) {
  const statement = 'MATCH (i:Item {uuid: {uuid}}) -[:IN_CATEGORY]-> (c) RETURN i, c'
  const result = yield cypher.send(statement, {uuid})
  const item = result[0].i
  const category = result[0].c
  item.categoryId = category.uuid
  return item
}

module.exports = {
  create,
  find
}
