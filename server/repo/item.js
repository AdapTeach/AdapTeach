var uuid = require('node-uuid');

var cypher = require('./graph/cypher');

module.exports = {

    create: function *(item) {
        var statement = `
            MATCH (c:Category {uuid: {categoryId}})
			CREATE (i:Item:Objective {uuid: {uuid}, name: {name}, description: {description}}) -[:IN_CATEGORY]-> (c)
			RETURN i, c`;
        var parameters = {
            categoryId: item.categoryId,
            uuid: uuid.v4(),
            name: item.name,
            description: item.description
        };
        var result = yield cypher.send(statement, parameters);
        var createdItem = result[0].i;
        createdItem.categoryId = result[0].c.uuid;
        return createdItem;
    },

    find: function *(uuid) {
        var statement = 'MATCH (i:Item {uuid: {uuid}}) -[:IN_CATEGORY]-> (c) RETURN i, c';
        var result = yield cypher.send(statement, {uuid});
        var item = result[0].i;
        var category = result[0].c;
        item.categoryId = category.uuid;
        return item;
    }

};