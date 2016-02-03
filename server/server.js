const koa = require('koa')
const logger = require('koa-logger')
const glob = require('glob-promise')
const cors = require('kcors')

const app = module.exports = koa(),
  port = process.env.PORT || 8000,
  env = process.env.NODE_ENV || 'development'

//app.use(logger())
app.use(cors());

// Routers
glob('server/router/*.js').then(routerPaths =>
  routerPaths.forEach(routerPath => {
    const router = require(`../${routerPath}`)
    app.use(router.routes())
  })
)

app.listen(port)
console.log('app listening on port:', port, env)
