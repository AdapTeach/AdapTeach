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

router.get('/api/objective/search/:name', async ctx => {
   ctx.status = 200
   ctx.body = await objectiveRepo.search(ctx.params.name)
})

export default router
