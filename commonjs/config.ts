const { Map } = require("immutable")

const environment = process.env.APP_ENV
const isTest = environment === "test"
const isDevelopment = environment === "development"
const isReview = environment === "review"
const isStaging = environment === "staging"
const isProduction = environment === "production"
const isDevelopmentLike = isDevelopment || isTest
const isProductionLike = !isDevelopmentLike

// Client application config
//
// WARNING: make sure no application secrets are included here,
// these variables are accessible on the client
const clientConfig = Map({
  // Environments
  environment,
  isTest,
  isDevelopment,
  isReview,
  isStaging,
  isProduction,
  isDevelopmentLike,
  isProductionLike,

  // Config from env vars
  apiUrl: process.env.BACKEND_API_URL,
  assetPrefix: process.env.ASSET_HOST || "",
  isFeatureMode: process.env.FEATURE_MODE,
  isStorybook: process.env.STORYBOOK,
})

exports.clientConfig = clientConfig.toJS()

// Server application config
const serverConfig = clientConfig.merge({
  port: process.env.PORT || "3001",
})

// Make each server config var available as a named export
serverConfig.forEach((value, key) => {
  exports[key] = value
})
