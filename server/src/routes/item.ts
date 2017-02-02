import {itemRepo} from '../repo/itemRepo'
const router = require('koa-router')()

router.post('/api/item', async ctx => {
   ctx.status = 201
   ctx.body = await itemRepo.create(ctx.request.body)
})

router.get('/api/item/:uuid', async ctx => {
   ctx.status = 200
   ctx.body = await itemRepo.find(ctx.params.uuid)
})

export default router
