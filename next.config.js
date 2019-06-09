const { EnvironmentPlugin } = require("webpack")
const withTypescript = require("@zeit/next-typescript")
const withCSS = require("@zeit/next-css")
const withOffline = require("next-offline")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})
const { isProductionLike } = require("./lib/config.ts")
const { publicRuntimeConfig } = require("./lib/runtime_config.ts")

module.exports = withBundleAnalyzer(
  withTypescript(
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
          config.mode = isProductionLike ? "production" : "development"
          config.devtool = options.dev
            ? "cheap-module-inline-source-map"
            : "hidden-source-map"
          config.plugins.push(new EnvironmentPlugin(process.env))
          return config
        },
      })
    )
  )
)
