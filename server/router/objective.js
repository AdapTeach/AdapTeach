const router = require('koa-router')()

const objectiveRepo = require('../repo/objective')

router.get('/api/objective/:uuid', function *() {
  this.status = 200
  this.body = yield objectiveRepo.find(this.params.uuid)
})

router.get('/api/objective', function *() {
  this.status = 200
  this.body = yield objectiveRepo.search(this.query.name)
})

module.exports = router
