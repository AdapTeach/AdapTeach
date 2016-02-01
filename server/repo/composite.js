var uuid = require('node-uuid');

var cypher = require('./graph/cypher');

module.exports = {

    create: function *(composite) {
        var statement = `
			CREATE (c:Composite:Objective {uuid: {uuid}, name: {name}, description: {description}})
			RETURN c`;
        var parameters = {
            uuid: uuid.v4(),
            name: composite.name,
            description: composite.description
        };
        var result = yield cypher.send(statement, parameters);
        return result[0].c
    },

    find: function *(uuid) {
        var statement = 'MATCH (c:Composite {uuid: {uuid}}) RETURN c';
        var result = yield cypher.send(statement, {uuid});
        return result[0].c
    }

};