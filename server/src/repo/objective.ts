import * as uuid from 'node-uuid'

const cypher = require('./graph/cypher')

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

function *find(uuid) {
  // OPTIONAL MATCH (o) -[:IN_CATEGORY]-> (c)
  // OPTIONAL MATCH (c) -[:CHILD_OF*]-> (p)
  // OPTIONAL MATCH (o) -[:COMPOSED_OF]-> (item:Item) -[:IN_CATEGORY]-> (category:Category)
  // OPTIONAL MATCH (o) -[:COMPOSED_OF]-> (composite:Composite)
  // RETURN o, c, collect(p) as parents
  const statement = `
    MATCH (o:Objective {uuid: {uuid}}) 
    RETURN o`
  const records = yield cypher.send(statement, {uuid})
  const record = records[0]
  return record.get('o').properties

}

function *search(name) {
  const statement = `
    MATCH (objective:Objective)
    OPTIONAL MATCH (objective) -[:IN_CATEGORY]-> (category)
    WHERE objective.name =~ {nameRegex}
    RETURN objective, category`
  const params = {
    nameRegex: buildNameRegex(name)
  }
  const records = yield cypher.send(statement, params)
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

module.exports = {
  find,
  search
}
