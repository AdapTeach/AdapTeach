var router = require('koa-router')();
var parse = require('co-body');

var compositeRepo = require('../repo/composite');

router.post('/api/composite', function *() {
    var body = yield parse(this);
    this.status = 201;
    this.body = yield compositeRepo.create(body)
});

router.get('/api/composite/:uuid', function *() {
    this.status = 200;
    this.body = yield compositeRepo.find(this.params.uuid)
});

module.exports = router;