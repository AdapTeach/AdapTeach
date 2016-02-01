var expect = require('chai').expect;

var itemAPI = require('./util/itemAPI');

describe('Item API', ()=> {

  it('creates Item', function *() {
    const item = {
      name: 'Item to create',
      description: 'Whatever'
    };
    var createdItem = yield itemAPI.create(item);
    expect(createdItem.uuid).to.exist;
    expect(createdItem.name).to.equal(item.name);
    expect(createdItem.description).to.equal(item.description);
    expect(createdItem.categoryId).to.equal(item.categoryId);
  });

  it('finds Item', function *() {
    const item = yield itemAPI.create();

    const foundItem = yield itemAPI.find(item.uuid);
    expect(foundItem).to.deep.equal(item);
  });

});
