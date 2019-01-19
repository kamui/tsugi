import { Map } from "immutable"

export const getClientSideLink = (link) => {
  return Map({
    as: link,
    href: link,
  })
}
