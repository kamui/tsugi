export const publicRuntimeConfig = {
  environment: process.env.APP_ENV,
  apiUrl: process.env.BACKEND_API_URL,
  assetPrefix: process.env.ASSET_HOST || "",
}

export default {
  publicRuntimeConfig,
}
