import * as R from 'ramda'
import * as moment from 'moment'
const Koa = require('koa')
const app = new Koa()
const cors = require('kcors')
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')
const glob = require('glob-promise')
const path = require('path')

const inDevEnv = process.env.NODE_ENV === 'development'

if (inDevEnv) {
   app.use(cors())
}

app.use(async(ctx, next) => {
   try {
      await next()
   } catch (e) {
      console.log(e)
      ctx.body = {error: e.message}
      ctx.status = e.statusCode
      if (inDevEnv) {
         console.error(e.message)
         console.error(e.stack.split('\n')[1])
      }
   }
})

app.use(bodyParser({
   onerror: function (err, ctx) {
      ctx.throw('body parse error', 422)
   }
}))


if (inDevEnv) {
   app.use(async(ctx, next) => {
      const received = moment()
      await next()
      const duration: number = moment().diff(received)
      console.log(ctx.request.method + ' - ' + ctx.response.status + ' - ' + ctx.request.url + ' (' + duration + 'ms)')
   })
}

const extension = inDevEnv ? 'ts' : 'js'
glob(path.resolve(__dirname, 'routes/*.' + extension)).then(R.forEach((routerPath: string) => {
   const router = require(routerPath).default
   app.use(router.routes())
}))

app.use(serve(path.resolve(__dirname, '../static')))

app.listen(8000)
