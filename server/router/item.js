var router = require('koa-router')();
var parse = require('co-body');

var itemRepo = require('../repo/item');

router.post('/api/item', function *() {
    var body = yield parse(this);
    this.status = 201;
    this.body = yield itemRepo.create(body)
});

router.get('/api/item/:uuid', function *() {
    this.status = 200;
    this.body = yield itemRepo.find(this.params.uuid)
});

module.exports = router;