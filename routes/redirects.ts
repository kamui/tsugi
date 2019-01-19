const Router = require("koa-router")

module.exports = new Router().redirect("/faq", "/help")
