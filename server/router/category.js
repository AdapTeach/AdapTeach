const router = require('koa-router')()
const parse = require('co-body')

const categoryRepo = require('../repo/category')

router.post('/api/category', function *() {
  const body = yield parse(this)
  this.status = 201
  this.body = yield categoryRepo.create(body)
})

router.get('/api/category/:uuid', function *() {
  this.status = 200
  this.body = yield categoryRepo.find(this.params.uuid)
})

router.get('/api/category/list', function *() {
  this.status = 200
  this.body = yield categoryRepo.list()
})

router.get('/api/category/search/:name', function *() {
  this.status = 200
  this.body = yield categoryRepo.search(this.params.name)
})

module.exports = router
