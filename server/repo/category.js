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
  const statement = 'CREATE (c:Category:RootCategory {uuid: {uuid}, name: {name}}) RETURN c'
  const parameters = {
    uuid: uuid.v4(),
    name: category.name
  }
  const records = yield cypher.send(statement, parameters)
  return records[0].get('c').properties
}

function categoryFromRecord(record) {
  const created = record.get('c').properties
  const parents = record.get('parents').map(node => node.properties)
  addParentHierarchy(created, parents);
  return created;
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
  const records = yield cypher.send(statement, parameters)
  return categoryFromRecord(records[0])
}

const find = function *(uuid) {
  const statement = `
    MATCH (c:Category {uuid: {uuid}})
    OPTIONAL MATCH (c) -[:CHILD_OF*]-> (p)
    RETURN c, collect(p) as parents`
  const records = yield cypher.send(statement, {uuid})
  return categoryFromRecord(records[0])
}

const search = function *(name) {
  const statement = `
    MATCH (c:Category)
    WHERE c.name  =~ {nameRegex}
    OPTIONAL MATCH (c) -[:CHILD_OF*]-> (p)
    RETURN c, collect(p) as parents`
  const nameRegex = `(?i)${name}.*`
  const parameters = {nameRegex}
  const records = yield cypher.send(statement, parameters)
  return records.map(categoryFromRecord)
}

module.exports = {
  create,
  find,
  search
}
