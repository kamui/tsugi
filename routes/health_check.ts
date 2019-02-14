const Router = require("koa-router")
const { apiUrl } = require("../commonjs/config.ts")
// const axios = require("axios")
// const Redis = require("../commonjs/redis")
// const RedisClient = Redis.createClient()

const OK = "ok"
const FAILURES = "failures"
const API_URL = `${apiUrl}/_dependency_health`

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

const cacheHealthCheck = async () => {
  try {
    // await RedisClient.set("_dependency_health", OK)
    // const value = await RedisClient.get("_dependency_health")

    return {
      cache: value === OK ? OK : FAILURES,
    }
  } catch (e) {
    return {
      cache: FAILURES,
    }
  }
}

// Health check endpoint
module.exports = new Router().get("/_dependency_health", async (ctx) => {
  // Fire checks in parallel, join and wait until they have completed
  const [apiResponse, cacheResponse] = await Promise.all([
    {}, // apiHealthCheck(),
    cacheHealthCheck(),
  ])

  // Build endpoint response
  const data = {
    now: Date.now().toString(),
    status:
      apiResponse.get("api") === OK && cacheResponse.get("cache") === OK
        ? OK
        : FAILURES,
  }

  ctx.response.set({
    "cache-control": "no-cache",
    "Content-Type": "application/json",
  })
  ctx.response.body = Object.assign(data, apiResponse, cacheResponse)
})
