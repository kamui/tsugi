import { Context } from "koa"
import { join } from "path"

// Keys are static paths, values are headers
const ROOT_STATIC_FILES: { [path: string]: { [key: string]: string } } = {
  "/browserconfig.xml": {
    "Cache-Control": "max-age=2592000", // 1 month
  },
  "/robots.txt": {
    "Cache-Control": "max-age=60",
  },
  "/sitemap.xml": {
    "Cache-Control": "max-age=60",
  },
}

function filePath(requestPath: string) {
  return join(__dirname, "..", "static", requestPath)
}

function staticRoot(app: any) {
  return async (ctx: Context, next: Function) => {
    const pathHeaders: { [key: string]: string } =
      ROOT_STATIC_FILES[ctx.request.path]
    if (typeof pathHeaders !== "undefined") {
      const path = filePath(ctx.request.path)
      ctx.response.set(pathHeaders)
      return app.serveStatic(ctx.req, ctx.res, path)
    }
    await next()
  }
}

export default staticRoot
