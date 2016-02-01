const uuid = require('node-uuid');

const cypher = require('./graph/cypher');

const create = function *(composite) {
  const statement = `
			CREATE (c:Composite:Objective {uuid: {uuid}, name: {name}, description: {description}})
			RETURN c`;
  const parameters = {
    uuid: uuid.v4(),
    name: composite.name,
    description: composite.description
  };
  const result = yield cypher.send(statement, parameters);
  return result[0].c
};

const find = function *(uuid) {
  const statement = 'MATCH (c:Composite {uuid: {uuid}}) RETURN c';
  const result = yield cypher.send(statement, {uuid});
  return result[0].c
};

module.exports = {
  create,
  find
};
