var expect = require('chai').expect;

var categoryAPI = require('./util/categoryAPI');

describe('Category API', function () {

    it('creates Category', function *() {
        const category = {name: 'Category to create'};
        const createdCategory = yield categoryAPI.create(category);
        expect(createdCategory.uuid).to.exist;
        expect(createdCategory.name).to.equal(category.name);
    });

    it('creates child Category', function *() {
        const parent = yield categoryAPI.create({name: 'Parent Category'});
        const child = yield categoryAPI.create({
            name: 'Child Category',
            parentId: parent.uuid
        });
        expect(child.uuid).to.exist;
        expect(child.parentId).to.equal(parent.uuid)
    });

    it('finds Category', function *() {
        const category = yield categoryAPI.create();

        const foundCategory = yield categoryAPI.find(category.uuid);
        expect(foundCategory).to.deep.equal(category);
    });

});