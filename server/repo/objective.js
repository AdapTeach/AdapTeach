const uuid = require('node-uuid')

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
  const result = yield cypher.send(statement, {uuid})
  const row = result[0]
  return row.o

}

function *search(name) {
  const itemSearchQuery = buildItemSearchQuery(name)
  const compositeSearchQuery = buildCompositeSearchQuery(name)
  const result = yield cypher.sendMany([itemSearchQuery, compositeSearchQuery])
  const items = result[0].map(row => {
    const item = row.item
    item.category = row.category
    return item
  })
  const composites = result[1].map(row => row.composite)
  return {items, composites}
}

module.exports = {
  find,
  search
}
