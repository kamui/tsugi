const cluster = require("cluster")
const numCPUs = require("os").cpus().length
const {
  isDevelopmentLike,
  isProductionLike,
  port,
} = require("./commonjs/config.ts")

if (cluster.isMaster) {
  // create a worker for each CPU
  for (let i = 0; i < (isDevelopmentLike ? 1 : numCPUs); i += 1) {
    cluster.fork()
  }

  // When a worker dies create another one
  cluster.on("exit", (worker) => {
    console.log(`worker ${worker.id} exited, respawning...`)
    cluster.fork()
  })
} else {
  // const newrelic = require("newrelic")  /* ignore lint warning */
  const next = require("next")
  const Koa = require("koa")
  const Router = require("koa-router")

  // Middlewares
  const cacheHeaders = require("./middlewares/cache_headers.ts")
  const compression = require("compression")
  const koaConnect = require("koa-connect")

  // Custom routes
  const healthCheck = require("./routes/health_check.ts")
  const staticRoot = require("./routes/static_root.ts")
  const redirectsRouter = require("./routes/redirects.ts")

  const app = next({ dev: isDevelopmentLike })
  const handle = app.getRequestHandler()

  app
    .prepare()
    .then(() => {
      const server = new Koa()
      const router = new Router()

      // Middlewares
      server.use(koaConnect(compression()))
      if (isProductionLike) {
        server.use(cacheHeaders())
      }
      server.use(staticRoot(app))

      // Handle with next.js
      router.get("*", async (ctx) => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
      })

      server.use(async (ctx, next) => {
        ctx.res.statusCode = 200
        await next()
      })

      server.use(healthCheck.routes())
      server.use(redirectsRouter.routes())
      server.use(router.routes())

      server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on port ${port}`)
      })
    })
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
}
