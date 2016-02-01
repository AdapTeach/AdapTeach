var expect = require('chai').expect;

var compositeAPI = require('./util/compositeAPI');

describe('Composite API', ()=> {

  it('creates Composite', function *() {
    const composite = {
      name: 'Composite to create',
      description: 'Whatever'
    };
    var createdComposite = yield compositeAPI.create(composite);
    expect(createdComposite.uuid).to.exist;
    expect(createdComposite.name).to.equal(composite.name);
    expect(createdComposite.description).to.equal(composite.description);
  });

  it('finds Composite', function *() {
    const composite = yield compositeAPI.create();

    const foundItem = yield compositeAPI.find(composite.uuid);
    expect(foundItem).to.deep.equal(composite);
  });

});
