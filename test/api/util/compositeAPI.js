var api = require('./api');

module.exports = {

    create: function *(composite) {
        if (!composite) {
            composite = {
                name: 'Test Composite',
                description: 'Test Composite Description'
            }
        }
        const response = yield api.post('/api/composite').send(composite).expect(201).end();
        return response.body
    },

    find: function *(uuid) {
        const response = yield api.get('/api/composite/' + uuid).expect(200).end();
        return response.body
    }

};