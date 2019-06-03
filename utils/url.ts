import Qs from "qs"
import { getClientSideLink } from "tsugi/utils/link"

// TODO: remove the path default empty string
// It's here because at runtime, we pull href's as the path and it can return undefined
export const buildUrl = (path = "", newQueryString = {}) => {
  const oldQueryString = extractQueryParams(path)
  const combinedQueryString = Object.assign({}, oldQueryString, newQueryString)
  const stringifiedQueryString = Qs.stringify(combinedQueryString)

  const barePath = getBasePath(path)

  return stringifiedQueryString.length
    ? `${barePath}?${stringifiedQueryString}`
    : barePath
}

export const getBasePath = (path: string) => {
  return stripQueryString(removeAnchor(path))
}

export const stripQueryString = (url: string) => {
  return url ? url.split("?")[0] : ""
}

// Remove anchor from url, preserving any query params
export const removeAnchor = (url: string) => {
  const parts = (url || "").split("#")

  if (parts.length == 1) return parts[0]

  const query = parts[1].split("?")

  return query.length == 1 ? parts[0] : [parts[0], query[1]].join("?")
}

export const extractQueryString = (url: string) => {
  return url ? url.split("?")[1] || "" : ""
}

export const extractQueryParams = (string: string) => {
  return string ? Qs.parse(extractQueryString(string)) : {}
}

export const buildHistoryUrl = (barePath: string, newQueryObject: Object) => {
  const stringifiedQueryString = Qs.stringify(newQueryObject)

  return stringifiedQueryString.length
    ? `${barePath}?${stringifiedQueryString}`
    : barePath
}

export const getClientRouteLink = (path: string) => {
  const link = getClientSideLink(path)

  return {
    as: link["as"],
    url: link["href"],
  }
}

export const getReferrerPathname = () => {
  // Default to homepage worse case scenario
  if (!window || !window.document || !window.document.createElement) {
    return "/"
  }
  const hrefElem = window.document.createElement("a")
  hrefElem.href = window.document.referrer
  return hrefElem.pathname
}
