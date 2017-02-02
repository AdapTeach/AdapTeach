import {objectiveRepo} from '../repo/objectiveRepo'
const router = require('koa-router')()

router.get('/api/objective/:uuid', async ctx => {
   ctx.status = 200
   ctx.body = await objectiveRepo.find(ctx.params.uuid)
})

router.get('/api/objective', async ctx => {
   ctx.status = 200
   ctx.body = await objectiveRepo.search(ctx.query.name)
})

export default router
