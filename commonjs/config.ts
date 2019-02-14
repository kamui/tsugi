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
const clientConfig = {
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
}

exports.clientConfig = clientConfig

// Server application config
const serverConfig = Object.assign(
  {
    port: process.env.PORT || "3001",
  },
  clientConfig
)

// Make each server config var available as a named export
Object.keys(serverConfig).forEach((key) => {
  exports[key] = serverConfig[key]
})
