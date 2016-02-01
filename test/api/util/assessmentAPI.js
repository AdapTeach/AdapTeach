var api = require('./api');

var itemAPI = require('./itemAPI');

module.exports = {

    create: function *(assessment) {
        if (!assessment){
            assessment = {
                name: 'Test Assessment',
                description: 'Test Assessment Description'
            }
        }
        if (!assessment.testedItems) {
            var item1 = yield itemAPI.create();
            var item2 = yield itemAPI.create();
            assessment.testedItemIds = [item1.uuid, item2.uuid];
        }
        const response = yield api.post('/api/assessment').send(assessment).expect(201).end();
        return response.body
    },

    find: function *(uuid) {
        const response = yield api.get('/api/assessment/' + uuid).expect(200).end();
        return response.body
    }

};