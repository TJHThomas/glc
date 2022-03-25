const Koa = require('koa')

const app = new Koa()

app.use(async (ctx, next) => {
  const { request: req = "" } = ctx
  const { url } = req
  if (url === '/') {
    ctx.body = '<h1>主页</h1>'
    return
  }
  ctx.body = '404'
  await next()
  ctx.status = 404
})

app.use((ctx) => {
  ctx.body = '找不到资源'
})

app.listen(3000, () => {
  console.log('启动成功')
})