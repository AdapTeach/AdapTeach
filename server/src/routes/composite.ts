import {compositeRepo} from '../repo/compositeRepo'
const router = require('koa-router')()

router.post('/api/composite', async ctx => {
   ctx.status = 201
   ctx.body = await compositeRepo.create(ctx.request.body)
})

router.get('/api/composite/:uuid', async ctx => {
   ctx.status = 200
   ctx.body = await compositeRepo.find(ctx.params.uuid)
})

export default router
