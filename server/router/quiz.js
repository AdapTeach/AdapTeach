const router = require('koa-router')()
const parse = require('co-body')

const quizRepo = require('../repo/quiz')

router.post('/api/quiz', function *() {
  const body = yield parse(this)
  this.status = 201
  this.body = yield quizRepo.create(body)
})

router.get('/api/quiz/:uuid', function *() {
  this.status = 200
  this.body = yield quizRepo.find(this.params.uuid)
})

module.exports = router
