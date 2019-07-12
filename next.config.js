const { EnvironmentPlugin } = require("webpack")
const withCSS = require("@zeit/next-css")
const withOffline = require("next-offline")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})
const { isProductionLike } = require("./dist/lib/config.js")
const { publicRuntimeConfig } = require("./dist/lib/runtime_config.js")

module.exports = withBundleAnalyzer(
  withOffline(
    withCSS({
      assetPrefix: process.env.ASSET_HOST || "",
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[local]---[hash:base64:5]",
      },
      distDir: "build",
      publicRuntimeConfig,

      webpack: (config, options) => {
        config.mode = isProductionLike(process.env.environment)
          ? "production"
          : "development"
        config.devtool = options.dev
          ? "cheap-module-inline-source-map"
          : "hidden-source-map"
        config.plugins.push(new EnvironmentPlugin(process.env))
        return config
      },
    })
  )
)
