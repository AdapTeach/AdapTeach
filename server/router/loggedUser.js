const router = require('koa-router')()
const parse = require('co-body')

const userRepo = require('../repo/user')

router.put('/api/loggedUser/objectives/:objectiveId', function *() {
  this.status = 200
  this.body = yield userRepo.addObjective(this.loggedUser.uuid, this.params.objectiveId)
})

router.get('/api/loggedUser/objectives', function *() {
  this.status = 200
  this.body = yield userRepo.findObjectives(this.loggedUser.uuid)
})

router.delete('/api/loggedUser/objectives/:objectiveId', function *() {
  this.status = 200
  this.body = yield userRepo.removeObjective(this.loggedUser.uuid, this.params.objectiveId)
})

module.exports = router
