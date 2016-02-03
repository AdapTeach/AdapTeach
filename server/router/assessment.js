const router = require('koa-router')()
const parse = require('co-body')

const assessmentRepo = require('../repo/assessment')

router.post('/api/assessment', function *() {
  const body = yield parse(this)
  this.status = 201
  this.body = yield assessmentRepo.create(body)
})

router.get('/api/assessment/:uuid', function *() {
  this.status = 200
  this.body = yield assessmentRepo.find(this.params.uuid)
})

router.post('/api/assessment/:uuid/prerequisite', function *() {
  this.status = 201
})

router.get('/api/assessment/:uuid/prerequisite', function *() {
  this.status = 200
  this.body = yield assessmentRepo.findPreqs(this.params.uuid)
})

module.exports = router
