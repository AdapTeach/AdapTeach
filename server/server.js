var koa = require('koa');
var logger = require('koa-logger');

var app = module.exports = koa(),
    port = process.env.PORT || 8000,
    env = process.env.NODE_ENV || 'development';
//app.use(logger());

var categoryRouter = require('./router/category');
app.use(categoryRouter.routes());

var itemRouter = require('./router/item');
app.use(itemRouter.routes());

var assessmentRouter = require('./router/assessment');
app.use(assessmentRouter.routes());

app.listen(port);
console.log('app listening on port:', port, env);