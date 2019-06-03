const { EnvironmentPlugin } = require("webpack")
const withTypescript = require("@zeit/next-typescript")
const withCSS = require("@zeit/next-css")
const withOffline = require("next-offline")
const withBundleAnalyzer = require("@next/bundle-analyzer")
const { isProductionLike } = require("./commonjs/config.ts")
// const fs = require("fs")

module.exports = withTypescript(
  withCSS(
    withOffline(
      withBundleAnalyzer({
        assetPrefix: process.env.ASSET_HOST || "",
        cssModules: true,
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName: "[local]---[hash:base64:5]",
        },
        distDir: "build",
        publicRuntimeConfig: {
          environment: process.env.APP_ENV,
          apiUrl: process.env.BACKEND_API_URL,
          assetPrefix: process.env.ASSET_HOST || "",
        },

        analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ["browser", "both"].includes(
          process.env.BUNDLE_ANALYZE
        ),
        bundleAnalyzerConfig: {
          server: {
            analyzerMode: "static",
            reportFilename: "../bundles/server.html",
          },
          browser: {
            analyzerMode: "static",
            reportFilename: "../bundles/client.html",
          },
        },

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
