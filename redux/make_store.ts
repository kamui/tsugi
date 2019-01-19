import { fromJS } from "immutable"
import { extractQueryParams } from "tsugi/utils/url"
import { createStore, applyMiddleware } from "redux"
import { combineReducers } from "redux-immutable"
import { isClient } from "tsugi/utils/client"
import ActionTypes from "tsugi/redux/action_types"
import currentPageReducer from "tsugi/redux/reducers/current_page_reducer"
import thunkMiddleware from "redux-thunk"

const rootReducer = combineReducers({
  currentPage: currentPageReducer,
})

let middleware = [thunkMiddleware /* needs to be first */]

// TODO: need to figure out a better way to conditionally
// require this, where it's not bundled in production.
// process.env.NODE_ENV is the only way webpack will ignore
if (process.env.NODE_ENV !== "production" && isClient) {
  const createLogger = require("redux-logger").createLogger
  const logger = createLogger({
    stateTransformer: (state) => state && state.toJS(), // readable immutable
  })

  middleware = [...middleware, logger]
}

export default (initialState, options) => {
  initialState = setupPage(initialState, options)

  return createStore(
    rootReducer,
    fromJS(initialState),
    applyMiddleware(...middleware)
  )
}

function setupPage(initialState = {}, options) {
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
    query: fromJS(req.query || {}),
    referrer: req.header && req.header("Referrer"),
    url: `${req.protocol}://${req.headers && req.headers.host}${req.url}`,
  }
}

function pageParamsFromWindow() {
  return {
    origin: window.location.origin,
    path: window.location.pathname,
    query: fromJS(extractQueryParams(window.location.search)),
    referrer: document.referrer,
    url: window.location.href,
  }
}
