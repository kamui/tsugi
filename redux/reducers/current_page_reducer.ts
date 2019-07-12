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
  isLoaded: false,
}

export default (state: any = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.CURRENT_PAGE_CHANGED:
      return produce(state, (draft: any) => {
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

      return produce(state, (draft: any) => {
        draft.scrollPositionHistory[getBasePath(state.path)] = positions
      })
    }

    case ActionTypes.CLIENT_ROUTE_CHANGED:
      return produce(state, (draft: any) => {
        draft.origin = window.location.origin
        draft.path = window.location.pathname
        draft.query = extractQueryParams(window.location.search)
        draft.referrer = `${state.origin}${state.path}`
        draft.url = window.location.href
      })

    case ActionTypes.NAVIGATION_CLICKED:
      return state

    case ActionTypes.PAGE_LOADED:
      return produce(state, (draft: any) => {
        ;(draft.scrollToTop = false), (draft.isLoaded = true)
      })

    default:
      return state
  }
}
