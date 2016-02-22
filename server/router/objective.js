const router = require('koa-router')()

const objectiveRepo = require('../repo/objective')

router.get('/api/objective/search/:name', function *() {
  this.status = 200
  this.body = yield objectiveRepo.search(this.params.name)
})

module.exports = router
