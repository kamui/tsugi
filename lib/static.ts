import manifestJson from "tsugi/static_manifest.json"
import getConfig, { isProductionLike } from "tsugi/lib/config"

const manifest: any = manifestJson

export default (filename: string): string => {
  const assetFile: string = `/static/${filename}`
  const { assetPrefix, environment }: any = getConfig()

  if (!isProductionLike(environment)) {
    return assetFile
  }

  const hashedFile = manifest[filename]

  if (!hashedFile) {
    return assetFile
  }

  return `${assetPrefix || ""}${hashedFile}`
}
