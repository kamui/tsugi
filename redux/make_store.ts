import { extractQueryParams } from "tsugi/utils/url"
import { createStore, combineReducers, applyMiddleware } from "redux"
import { isClient } from "tsugi/utils/client"
import ActionTypes from "tsugi/redux/action_types"
import currentPageReducer from "tsugi/redux/reducers/current_page_reducer"
import createSagaMiddleware from "redux-saga"

const rootReducer = combineReducers({
  currentPage: currentPageReducer,
})

const sagaMiddleware = createSagaMiddleware()
let middleware = [sagaMiddleware /* needs to be first */]

// TODO: need to figure out a better way to conditionally
// require this, where it's not bundled in production.
// process.env.NODE_ENV is the only way webpack will ignore
if (process.env.NODE_ENV !== "production" && isClient) {
  const createLogger = require("redux-logger").createLogger
  const logger = createLogger({
    stateTransformer: (state: object) => state,
  })

  middleware = [...middleware, logger]
}

export default (initialState: object, options: object) => {
  initialState = setupPage(initialState, options)

  return createStore(rootReducer, initialState, applyMiddleware(...middleware))
}

function setupPage(initialState = {}, options: object) {
  const currentPageParams = options.isServer
    ? pageParamsFromRequest(options.req)
    : pageParamsFromWindow()

  const action = {
    type: ActionTypes.CURRENT_PAGE_CHANGED,
    ...currentPageParams,
  }
  const currentPage = currentPageReducer(undefined, action)

  return Object.assign(initialState, { currentPage })
}

function pageParamsFromRequest(req = {}) {
  return {
    origin: req.hostname,
    path: req.path,
    query: req.query || {},
    referrer: req.header && req.header("Referrer"),
    url: `${req.protocol}://${req.headers && req.headers.host}${req.url}`,
  }
}

function pageParamsFromWindow() {
  return {
    origin: window.location.origin,
    path: window.location.pathname,
    query: extractQueryParams(window.location.search),
    referrer: document.referrer,
    url: window.location.href,
  }
}
