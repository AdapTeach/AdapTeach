import {categoryRepo} from '../repo/categoryRepo'
const router = require('koa-router')()

router.post('/api/category', async ctx => {
   ctx.status = 201
   ctx.body = await categoryRepo.create(ctx.request.body)
})

router.get('/api/category/:uuid', async ctx => {
   ctx.status = 200
   ctx.body = await categoryRepo.find(ctx.params.uuid)
})

// router.get('/api/category/list', async ctx => {
//    ctx.status = 200
//    ctx.body = await categoryRepo.list()
// })

router.get('/api/category/search/:name', async ctx => {
   ctx.status = 200
   ctx.body = await categoryRepo.search(ctx.params.name)
})

export default router
