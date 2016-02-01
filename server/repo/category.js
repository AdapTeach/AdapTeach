const uuid = require('node-uuid');

const cypher = require('./graph/cypher');

const create = function *(category) {
  if (category.parentId) {
    return yield createChild(category);
  } else {
    return yield createRoot(category);
  }
};

const createRoot = function *(category) {
  const statement = 'CREATE (c:Category {uuid: {uuid}, name: {name}}) RETURN c';
  const parameters = {
    uuid: uuid.v4(),
    name: category.name
  };
  const result = yield cypher.send(statement, parameters);
  return result[0].c
};

const createChild = function *(category) {
  const statement = `
        MATCH (p:Category { uuid:{parentId} })
        CREATE (c:Category { uuid:{uuid}, name: {name} }) -[:CHILD_OF]-> (p) RETURN c`;
  const parameters = {
    parentId: category.parentId,
    uuid: uuid.v4(),
    name: category.name
  };
  const result = yield cypher.send(statement, parameters);
  const created = result[0].c;
  created.parentId = category.parentId;
  return created
};

const find = function *(uuid) {
  const statement = 'MATCH (c:Category {uuid: {uuid}}) RETURN c';
  const result = yield cypher.send(statement, {uuid});
  return result[0].c
};

module.exports = {
  create,
  find
};
