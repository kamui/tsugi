import { fromJS, Iterable } from "immutable"
import { camelizeKeys, decamelizeKeys } from "humps"

export const toCamelizedImmutable = (json) => {
  return fromJS(camelizeKeys(json))
}

export const toDecamelizedJSON = (immutableObject, separator = "_") => {
  return decamelizeKeys(immutableObject.toJSON(), { separator })
}

// Return given object if an instance of immutable
// Otherwise return a new instance of immtuableType, if given
// TODO: change to Immutable.isImmutable when moving to v4 of immutablejs
export const checkImmutable = (immutableObject, immutableType) => {
  return Iterable.isIterable(immutableObject)
    ? immutableObject
    : immutableType
    ? immutableType()
    : false
}
