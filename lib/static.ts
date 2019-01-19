import asset from "next/asset"
import manifest from "tsugi/static_manifest.json"
import getConfig from "tsugi/config/application"

export default (filename) => {
  const assetFile = asset(filename)
  const { assetPrefix, isProductionLike } = getConfig()

  if (!isProductionLike) {
    return assetFile
  }

  const hashedFile = manifest[filename]

  if (!hashedFile) {
    return assetFile
  }

  return `${assetPrefix || ""}${hashedFile}`
}
