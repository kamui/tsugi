/*
 * This configuration is specific for
 * 1) Application server layer
 * 2) Foundation layer
 */

exports.apiUrl = process.env.FLATIRON_API_URL
exports.environment = process.env.APP_ENV
exports.isDevelopment = exports.environment === "development"
exports.isTest = exports.environment === "test"
exports.isDevelopmentLike = exports.isDevelopment || exports.isTest
exports.isProductionLike = !exports.isDevelopmentLike
exports.isStorybook = process.env.STORYBOOK
exports.port = process.env.PORT || "3001"
exports.assetPrefix = process.env.ASSET_HOST || ""
