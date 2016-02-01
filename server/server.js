const koa = require('koa');
const logger = require('koa-logger');

const app = module.exports = koa(),
  port = process.env.PORT || 8000,
  env = process.env.NODE_ENV || 'development';
//app.use(logger());

const categoryRouter = require('./router/category');
app.use(categoryRouter.routes());

const itemRouter = require('./router/item');
app.use(itemRouter.routes());

const assessmentRouter = require('./router/assessment');
app.use(assessmentRouter.routes());

const compositeRouter = require('./router/composite');
app.use(compositeRouter.routes());

app.listen(port);
console.log('app listening on port:', port, env);
