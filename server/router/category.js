var router = require('koa-router')();
var parse = require('co-body');

var categoryRepo = require('../repo/category');

router.post('/api/category', function *() {
    var body = yield parse(this);
    this.status = 201;
    this.body = yield categoryRepo.create(body)
});

router.get('/api/category/:uuid', function *() {
    this.status = 200;
    this.body = yield categoryRepo.find(this.params.uuid)
});

module.exports = router;