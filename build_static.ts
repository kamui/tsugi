const fs = require("fs-extra")
const path = require("path")
const md5 = require("md5-file")
const glob = require("glob")

const manifestFile = "static_manifest.json"
const publicStaticDir = "static/public"

function buildStaticFiles() {
  // Create empty manifest
  fs.writeFileSync(manifestFile, JSON.stringify({}, null, 2))

  // Get all static files (ignore public)
  const files = glob.sync("static/**", {
    nodir: true,
    ignore: `${publicStaticDir}/**`,
  })

  // Process static files
  files.forEach((filename) => {
    const hash = md5.sync(filename)

    const dir = path.dirname(filename)
    const ext = path.extname(filename)
    const name = path.basename(filename, ext)

    const newDir =
      dir === "static"
        ? publicStaticDir // file is not in static subdirectory
        : `${publicStaticDir}/${dir.replace(/.*static\//, "")}`

    const hashedName = `${newDir}/${name}-${hash}${ext}`

    // Copy file
    const contents = fs.readFileSync(filename)
    const publicFile = path.join(".", hashedName)
    fs.ensureFileSync(publicFile)
    fs.writeFileSync(publicFile, contents)

    // Load manifest
    const manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8"))

    // Write new mapping
    const relativeFilename = filename.replace(/.*static\//, "")
    const clientPath = `/${hashedName}`
    manifest[relativeFilename] = clientPath

    // Update manifest file
    fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2))

    console.log(relativeFilename, "->", clientPath)
  })
}

buildStaticFiles()
