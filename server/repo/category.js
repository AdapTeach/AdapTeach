const uuid = require('node-uuid')

const cypher = require('./graph/cypher')
const addParentHierarchy = require('./util').addParentHierarchyToCategory

const create = function *(category) {
  if (category.parentId) {
    return yield createChild(category)
  } else {
    return yield createRoot(category)
  }
}

const createRoot = function *(category) {
  const statement = 'CREATE (c:Category {uuid: {uuid}, name: {name}}) RETURN c'
  const parameters = {
    uuid: uuid.v4(),
    name: category.name
  }
  const result = yield cypher.send(statement, parameters)
  return result[0].c
}

const createChild = function *(category) {
  const statement = `
    MATCH (p:Category { uuid:{parentId} })
    CREATE (c:Category { uuid:{uuid}, name: {name} }) -[:CHILD_OF]-> (p)
    WITH c
    MATCH (c) -[:CHILD_OF*]-> (p)
    RETURN c, collect(p) as parents`
  const parameters = {
    parentId: category.parentId,
    uuid: uuid.v4(),
    name: category.name
  }
  const result = yield cypher.send(statement, parameters)
  return categoryFromRow(result[0])
}

function categoryFromRow(row) {
  const created = row.c
  const parents = row.parents
  addParentHierarchy(created, parents);
  return created;
}

const find = function *(uuid) {
  const statement = `
    MATCH (c:Category {uuid: {uuid}})
    OPTIONAL MATCH (c) -[:CHILD_OF*]-> (p)
    RETURN c, collect(p) as parents`
  const result = yield cypher.send(statement, {uuid})
  return categoryFromRow(result[0])
}

// TODO Delete ?
const list = function *() {
  const result = yield cypher.send('MATCH (c:Category) RETURN collect(c) as categories')
  return result[0].categories
}

const search = function *(name) {
  const statement = `
    MATCH (c:Category)
    WHERE c.name  =~ {nameRegex}
    OPTIONAL MATCH (c) -[:CHILD_OF*]-> (p)
    RETURN c, collect(p) as parents`
  const nameRegex = `(?i)${name}.*`
  const parameters = {nameRegex}
  const result = yield cypher.send(statement, parameters)
  return result.map(categoryFromRow)
}

module.exports = {
  create,
  find,
  list,
  search
}
