var expect = require('chai').expect;

var categoryAPI = require('./util/categoryAPI');

describe('Category API', function () {

    it('creates Category', function *() {
        const category = {name: 'Category to create'};
        var createdCategory = yield categoryAPI.create(category);
        expect(createdCategory.uuid).to.exist;
        expect(createdCategory.name).to.equal(category.name);
    });

    it('finds Category', function *() {
        const category = yield categoryAPI.create();

        const foundCategory = yield categoryAPI.find(category.uuid);
        expect(foundCategory).to.deep.equal(category);
    });

});