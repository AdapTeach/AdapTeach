var uuid = require('node-uuid');

var cypher = require('./graph/cypher');

module.exports = {

    create: function *(category) {
        var statement = "CREATE (c:Category {uuid: {uuid}, name: {name}}) RETURN c";
        var parameters = {
            uuid: uuid.v4(),
            name: category.name
        };
        var result = yield cypher.send(statement, parameters);
        return result[0].c;
    },

    find: function *(uuid) {
        var statement = 'MATCH (c:Category {uuid: {uuid}}) RETURN c';
        var result = yield cypher.send(statement, {uuid});
        return result[0].c;
    }

};