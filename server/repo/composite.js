const uuid = require('node-uuid')

const cypher = require('./graph/cypher')

function compositeFromRow(row) {
  const composite = row.c
  const items = row.items || []
  const categories = row.categories || []
  addCategoriesToItems(items, categories)
  const composites = row.composites || []
  composite.components = {items, composites}
  return composite
}

function addCategoriesToItems(items, categories) {
  items.forEach((item, index) => item.category = categories[index])
  return items
}

const create = function *(compositeFields) {
  // The second, long query will not return created Composite if the objectiveIds array is empty
  var statement = `
    CREATE (c:Composite:Objective {uuid: {uuid}, name: {name}, description: {description}})
    RETURN c`
  if (compositeFields.componentIds) statement = `
    CREATE (c:Composite:Objective {uuid: {uuid}, name: {name}, description: {description}})
    WITH c
    UNWIND {componentIds} AS componentId
      MATCH (o:Objective {uuid: componentId})
      CREATE (c) -[:COMPOSED_OF]-> (o)
    WITH c
    OPTIONAL MATCH (c) -[:COMPOSED_OF]-> (item:Item) -[:IN_CATEGORY]-> (category:Category)
    OPTIONAL MATCH (c) -[:COMPOSED_OF]-> (composite:Composite)
    RETURN c, collect(DISTINCT item) as items, collect(DISTINCT category) as categories, collect(composite) as composites`
  const parameters = {
    uuid: uuid.v4(),
    name: compositeFields.name,
    description: compositeFields.description || '',
    componentIds: compositeFields.componentIds
  }
  const result = yield cypher.send(statement, parameters)
  return compositeFromRow(result[0])
}

const find = function *(uuid) {
  const statement = `
    MATCH (c:Composite {uuid: {uuid}})
    OPTIONAL MATCH (c) -[:COMPOSED_OF]-> (item:Item) -[:IN_CATEGORY]-> (category:Category)
    OPTIONAL MATCH (c) -[:COMPOSED_OF]-> (composite:Composite)
    RETURN c, collect(item) as items, collect(category) as categories, collect(composite) as composites`
  const result = yield cypher.send(statement, {uuid})
  return compositeFromRow(result[0])
}

module.exports = {
  create,
  find
}
