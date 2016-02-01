var uuid = require('node-uuid');

var cypher = require('./graph/cypher');

var createRoot = function *(category) {
    var statement = 'CREATE (c:Category {uuid: {uuid}, name: {name}}) RETURN c';
    var parameters = {
        uuid: uuid.v4(),
        name: category.name
    };
    var result = yield cypher.send(statement, parameters);
    return result[0].c
};

var createChild = function *(category) {
    var statement = `
        MATCH (p:Category { uuid:{parentId} })
        CREATE (c:Category { uuid:{uuid}, name: {name} }) -[:CHILD_OF]-> (p) RETURN c`;
    var parameters = {
        parentId: category.parentId,
        uuid: uuid.v4(),
        name: category.name
    };
    var result = yield cypher.send(statement, parameters);
    var created = result[0].c;
    created.parentId = category.parentId;
    return created
};

module.exports = {

    create: function *(category) {
        if (category.parentId) {
            return yield createChild(category);
        } else {
            return yield createRoot(category);
        }
    },

    find: function *(uuid) {
        var statement = 'MATCH (c:Category {uuid: {uuid}}) RETURN c';
        var result = yield cypher.send(statement, {uuid});
        return result[0].c
    }

};