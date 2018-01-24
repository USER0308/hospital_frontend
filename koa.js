const Koa = require('koa')
const app = Koa()
const koa = require('koa-router')()
const json = require('koa-json')
const logger = require('koa-logger')
const auth = require('./server/routes/auth')
const api = require('./server/routes/api')
const ws = require('./server/routes/ws')
const front = require('./server/routes/front')
const WebSocketServer = require('./server/models/websocket')

app.use(require('koa-bodyparser')())
app.use(json())
app.use(logger())
// 记录每次请求的时间
app.use(function* (next) {
  let start = new Date()
  yield next
  let ms = new Date() - start
  console.log('%s %s - %s', this.method, this.url, ms)
})

app.on('error', function (err, ctx) {
  console.log('server error', err)
})
// router
koa.use('/auth', auth.routes())
koa.use('/api', api.routes())
koa.use('/patient', front.routes())

app.use(koa.routes())

var server = app.listen(8889)
// websocket
app.wss = WebSocketServer(server)
// 注册websocket路由
app.wss.routes(ws)

module.exports = app
