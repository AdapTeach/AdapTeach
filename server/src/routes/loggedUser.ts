import {userRepo} from '../repo/userRepo'
const router = require('koa-router')()

router.put('/api/loggedUser/objectives/:objectiveId', async ctx => {
   ctx.status = 200
   ctx.body = await userRepo.addObjective(ctx.loggedUser.uuid, ctx.params.objectiveId)
})

router.get('/api/loggedUser/objectives', async ctx => {
   ctx.status = 200
   ctx.body = await userRepo.findObjectives(ctx.loggedUser.uuid)
})

router.delete('/api/loggedUser/objectives/:objectiveId', async ctx => {
   ctx.status = 200
   ctx.body = await userRepo.removeObjective(ctx.loggedUser.uuid, ctx.params.objectiveId)
})

export default router
