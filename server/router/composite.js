const router = require('koa-router')();
const parse = require('co-body');

const compositeRepo = require('../repo/composite');

router.post('/api/composite', function *() {
  const body = yield parse(this);
  this.status = 201;
  this.body = yield compositeRepo.create(body)
});

router.get('/api/composite/:uuid', function *() {
  this.status = 200;
  this.body = yield compositeRepo.find(this.params.uuid)
});

module.exports = router;
