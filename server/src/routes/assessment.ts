import {assessmentRepo} from '../repo/assessmentRepo'
const router = require('koa-router')()

router.post('/api/assessment', async ctx => {
   ctx.status = 201
   ctx.body = await assessmentRepo.create(ctx.request.body)
})

router.get('/api/assessment/:uuid', async ctx => {
   ctx.status = 200
   ctx.body = await assessmentRepo.find(ctx.params.uuid)
})

export default router
