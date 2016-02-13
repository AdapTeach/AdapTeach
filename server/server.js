const koa = require('koa')
const logger = require('koa-logger')
const glob = require('glob-promise')
const cors = require('kcors')

const app = module.exports = koa(),
  port = process.env.PORT || 8000,
  env = process.env.NODE_ENV || 'development'

const InvalidArgumentError = require('./error/invalid-argument')

//app.use(logger())
app.use(cors())

app.use(function *handleErrors(next) {
  try {
    yield next
  } catch (e) {
    this.body = {error: e.message}
    if (e instanceof InvalidArgumentError) {
      this.status = 400
    } else {
      this.status = 500
      if (env !== 'development') {
        this.body = {error: 'Unexpected Error: Check server logs'}
      }
    }
  }
})

// Routers
glob('server/router/*.js').then(routerPaths =>
  routerPaths.forEach(routerPath => {
    const router = require(`../${routerPath}`)
    app.use(router.routes())
  })
)

app.listen(port)
console.log('app listening on port:', port, env)
