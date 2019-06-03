import Router from "koa-router"

const Redirects = new Router().redirect("/faq", "/help")

export default Redirects
