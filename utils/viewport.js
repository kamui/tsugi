import { tabletBreakpoint, smartphoneBreakpoint } from "tsugi/utils/breakpoints"
import { isServer } from "tsugi/utils/client"

export const detectSmartphoneWidth = () => {
  return detectViewportWidth() < smartphoneBreakpoint
}

export const detectTabletWidth = () => {
  // default to tablet on SSR
  if (isServer)
    return true

  return detectViewportWidth() < tabletBreakpoint
}

export const detectDesktopWidth = () => {
  return detectViewportWidth() > tabletBreakpoint
}

export const detectViewportWidth = () => {
  return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
}

export const detectViewportHeight = () => {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
}

export const getDocumentHeight = () => {
  const body = document.body
  const html = document.documentElement

  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight,
  )
}

export const setScrollTop = (topPosition) => {
  if (!document || !document.documentElement || !document.body)
    return

  document.documentElement.scrollTop = document.body.scrollTop = topPosition
}

export const getScrollTop = () => {
  if (isServer)
    return 0

  return window.pageYOffset || document.documentElement.scrollTop
}
