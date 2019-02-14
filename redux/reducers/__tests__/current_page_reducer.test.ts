import ActionTypes from "tsugi/redux/action_types"
import currentPageReducer from "tsugi/redux/reducers/current_page_reducer"

const initialState = {
  scrollPositionHistory: {},
  origin: "",
  path: "",
  query: {},
  referrer: "",
  scrollToTop: false,
  url: "",
}

describe("Current Page Reducer", () => {
  describe("initial state", () => {
    it("sets an initial state when no state is given", () => {
      const state = currentPageReducer(undefined, {})
      expect(state).toEqual(initialState)
    })
  })

  describe("default", () => {
    it("should not create a new object for non-modified states", () => {
      const state = currentPageReducer(initialState, {})
      expect(state).toBe(initialState)
    })
  })

  describe("CURRENT_PAGE_CHANGED", () => {
    const path = "/test"
    const query = { hello: "world" }
    const url = "/test?hello=world"

    const action = {
      type: ActionTypes.CURRENT_PAGE_CHANGED,
      path,
      query,
      url,
    }

    const state = currentPageReducer(initialState, action)

    expect(state.path).toEqual(path)
    expect(state.query).toEqual(query)
    expect(state.url).toEqual(url)
  })

  describe("CLIENT_ROUTE_CHANGED", () => {
    const origin = "http://localhost"
    const pathname = "/"
    const newUrl = "/about"

    history.pushState({}, "About", "")

    const action = {
      type: ActionTypes.CLIENT_ROUTE_CHANGED,
      newUrl,
    }

    const state = currentPageReducer(initialState, action)

    expect(state.path).toEqual(pathname)
    expect(state.origin).toEqual(origin)
    expect(state.url).toEqual(`${origin}${pathname}`)
  })

  describe("CLIENT_ROUTE_CHANGE_STARTED", () => {
    it("stores documentHeight and scrollPosition for current page", () => {
      // Height
      Object.defineProperty(document.body, "scrollHeight", {
        writable: true,
        value: 1000,
      })

      // Scroll Position
      Object.defineProperty(window, "pageYOffset", {
        writable: true,
        value: 500,
      })

      const action = {
        type: ActionTypes.CLIENT_ROUTE_CHANGE_STARTED,
      }

      const state = (initialState.path = "/page")

      const newState = currentPageReducer(state, action)
      const positions = (newState.scrollPositionHistory = "/page")

      expect(positions.documentHeight).toEqual(1000)
      expect(positions.scrollPosition).toEqual(500)
    })
  })

  describe("NAVIGATION_CLICKED", () => {})
})
