var router = require('koa-router')();
var parse = require('co-body');

var assessmentRepo = require('../repo/assessment');

router.post('/api/assessment', function *() {
    var body = yield parse(this);
    this.status = 201;
    this.body = yield assessmentRepo.create(body)
});

router.get('/api/assessment/:uuid', function *() {
    this.status = 200;
    this.body = yield assessmentRepo.find(this.params.uuid)
});

module.exports = router;