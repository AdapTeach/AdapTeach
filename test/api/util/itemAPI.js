var api = require('./api');

var categoryAPI = require('./categoryAPI');

module.exports = {

    create: function *(item) {
        if (!item) {
            item = {
                name: 'Test Item',
                description: 'Test Item Description'
            }
        }
        if (!item.categoryId) {
            var category = yield categoryAPI.create();
            item.categoryId = category.uuid
        }
        const response = yield api.post('/api/item').send(item).expect(201).end();
        return response.body
    },

    find: function *(uuid) {
        const response = yield api.get('/api/item/' + uuid).expect(200).end();
        return response.body
    }

};