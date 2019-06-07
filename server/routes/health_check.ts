import Router from "koa-router"

// const axios = require("axios")
// const Redis = require("../lib/redis")
// const RedisClient = Redis.createClient()

// const apiUrl: string | undefined = process.env.BACKEND_API_URL
// const OK: string = "ok"
// const FAILURES: string = "failures"
// const API_URL: string = `${apiUrl}/_dependency_health`

// const apiHealthCheck = async () => {
//   try {
//     await axios.get(API_URL)
//     return Map({
//       api: OK,
//     })
//   } catch (e) {
//     return Map({
//       api: FAILURES,
//     })
//   }
// }

// const cacheHealthCheck = async () => {
//   try {
//     await RedisClient.set("_dependency_health", OK)
//     const value = await RedisClient.get("_dependency_health")

//     return {
//       cache: value === OK ? OK : FAILURES,
//     }
//   } catch (e) {
//     return {
//       cache: FAILURES,
//     }
//   }
// }

// Health check endpoint
const healthCheck = new Router().get(
  "/_dependency_health",
  async (ctx: any) => {
    // Fire checks in parallel, join and wait until they have completed
    const [apiResponse, cacheResponse] = await Promise.all([
      {}, // apiHealthCheck(),
      // cacheHealthCheck(),
    ])

    // Build endpoint response
    // const data = {
    //   now: Date.now().toString(),
    //   status:
    //     apiResponse.get("api") === OK && cacheResponse.get("cache") === OK
    //       ? OK
    //       : FAILURES,
    // }
    const data = {}

    ctx.response.set({
      "cache-control": "no-cache",
      "Content-Type": "application/json",
    })
    ctx.response.body = Object.assign(data, apiResponse, cacheResponse)
  }
)

export default healthCheck
