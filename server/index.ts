import next from "next"
import Koa from "koa"
import Router from "koa-router"
import healthCheck from "./routes/health_check"
import staticRoot from "./routes/static_root"
import redirectsRouter from "./routes/redirects"
import { isDevelopmentLike, isProductionLike } from "../commonjs/config"

const cluster = require("cluster")
const numCPUs = require("os").cpus().length

const port = process.env.PORT || "3001"
const environment = process.env.environment || "development"

if (cluster.isMaster) {
  // create a worker for each CPU
  for (let i = 0; i < (isDevelopmentLike(environment) ? 1 : numCPUs); i += 1) {
    cluster.fork()
  }

  // When a worker dies create another one
  cluster.on("exit", (worker: any) => {
    console.log(`worker ${worker.id} exited, respawning...`)
    cluster.fork()
  })
} else {
  // const next = require("next")
  // const Koa = require("koa")
  // const Router = require("koa-router")

  // Middlewares
  const cacheHeaders = require("./middlewares/cache_headers.ts")
  const compression = require("compression")
  const koaConnect = require("koa-connect")

  // Custom routes
  // const healthCheck = require("./routes/health_check.ts")
  // const staticRoot = require("./routes/static_root.ts")
  // const redirectsRouter = require("./routes/redirects.ts")

  const app = next({ dev: isDevelopmentLike(environment) })
  const handle = app.getRequestHandler()

  app
    .prepare()
    .then(() => {
      const server = new Koa()
      const router = new Router()

      // Middlewares
      server.use(koaConnect(compression()))
      if (isProductionLike(environment)) {
        server.use(cacheHeaders())
      }
      server.use(staticRoot(app))

      // Handle with next.js
      router.get("*", async (ctx: Koa.Context) => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
      })

      server.use(async (ctx: Koa.Context, next: Function) => {
        ctx.res.statusCode = 200
        await next()
      })

      server.use(healthCheck.routes())
      server.use(redirectsRouter.routes())
      server.use(router.routes())

      server.on("error", (err: Error) => {
        throw err
      })

      server.listen(port, () => {
        console.log(`> Ready on port ${port}`)
      })
    })
    .catch((e: Error) => {
      console.error(e)
      process.exit(1)
    })
}
