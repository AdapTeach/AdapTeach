const router = require('koa-router')()
const parse = require('co-body')

const userRepo = require('../repo/user')

router.put('/api/loggedUser/objectives/:objectiveId', function *() {
  const body = yield parse(this)
  this.status = 200
  this.body = yield userRepo.addObjective(this.loggedUser.uuid, this.params.objectiveId)
})

module.exports = router
