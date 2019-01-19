import { fromJS } from "immutable"
import ActionTypes from "tsugi/redux/action_types"
import { extractQueryParams, getBasePath } from "tsugi/utils/url"
import { getDocumentHeight, getScrollTop } from "tsugi/utils/viewport"

const initialState = fromJS({
  scrollPositionHistory: {},
  origin: "",
  path: "",
  query: {},
  referrer: "",
  scrollToTop: false,
  url: "",
})

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CURRENT_PAGE_CHANGED:
      return state.merge({
        origin: action.origin,
        path: action.path,
        query: action.query || fromJS({}),
        referrer: action.referrer,
        url: action.url,
      })

    case ActionTypes.CLIENT_ROUTE_CHANGE_STARTED: {
      const positions = fromJS({
        documentHeight: getDocumentHeight(),
        scrollPosition: getScrollTop(),
      })

      return state.setIn(
        ["scrollPositionHistory", getBasePath(state.get("path"))],
        positions
      )
    }

    case ActionTypes.CLIENT_ROUTE_CHANGED:
      return state.merge({
        origin: window.location.origin,
        path: window.location.pathname,
        query: fromJS(extractQueryParams(window.location.search)),
        referrer: `${state.get("origin")}${state.get("path")}`,
        url: window.location.href,
      })

    case ActionTypes.NAVIGATION_CLICKED:
      return state

    case ActionTypes.PAGE_LOADED:
      return state.set("scrollToTop", false)

    default:
      return state
  }
}
