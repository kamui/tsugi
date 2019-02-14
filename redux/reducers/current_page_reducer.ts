import produce from "immer"
import ActionTypes from "tsugi/redux/action_types"
import { extractQueryParams, getBasePath } from "tsugi/utils/url"
import { getDocumentHeight, getScrollTop } from "tsugi/utils/viewport"

const initialState = {
  scrollPositionHistory: {},
  origin: "",
  path: "",
  query: {},
  referrer: "",
  scrollToTop: false,
  url: "",
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CURRENT_PAGE_CHANGED:
      return produce(state, (draft: object) => {
        draft.origin = action.origin
        draft.path = action.path
        draft.query = action.query || {}
        draft.referrer = action.referrer
        draft.url = action.url
      })

    case ActionTypes.CLIENT_ROUTE_CHANGE_STARTED: {
      const positions = {
        documentHeight: getDocumentHeight(),
        scrollPosition: getScrollTop(),
      }

      return produce(state, (draft: object) => {
        draft.scrollPositionHistory[getBasePath(state.path)] = positions
      })
    }

    case ActionTypes.CLIENT_ROUTE_CHANGED:
      return produce(state, (draft) => {
        draft.origin = window.location.origin
        draft.path = window.location.pathname
        draft.query = extractQueryParams(window.location.search)
        draft.referrer = `${state.origin}${state.path}`
        draft.url = window.location.href
      })

    case ActionTypes.NAVIGATION_CLICKED:
      return state

    case ActionTypes.PAGE_LOADED:
      return produce(state, (draft) => {
        draft.scrollToTop = false
      })

    default:
      return state
  }
}
