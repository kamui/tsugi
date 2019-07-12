import ActionTypes from "tsugi/redux/action_types"

interface PageLoadedAction {
  type: typeof ActionTypes.PAGE_LOADED
}

interface NavigationAction {
  type: typeof ActionTypes.NAVIGATION_CLICKED
  item: string
}

export function pageLoaded(): PageLoadedAction {
  return {
    type: ActionTypes.PAGE_LOADED,
  }
}

export function navigationClicked(item: string): NavigationAction {
  return {
    type: ActionTypes.NAVIGATION_CLICKED,
    item,
  }
}
