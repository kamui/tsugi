import getConfig from "next/config"

export default (): any => {
  const { publicRuntimeConfig = {} }: any = getConfig()
  console.log(`publicRuntimeConfig": ${publicRuntimeConfig}`)
  return publicRuntimeConfig
}

export const isTest = (environment: string): boolean => {
  return environment === "test"
}
export const isDevelopment = (environment: string): boolean => {
  return environment === "development"
}
export const isReview = (environment: string): boolean => {
  return environment === "review"
}
export const isStaging = (environment: string): boolean => {
  return environment === "staging"
}
export const isProduction = (environment: string): boolean => {
  return environment === "production"
}
export const isDevelopmentLike = (environment: string): boolean => {
  return isDevelopment(environment) || isTest(environment)
}
export const isProductionLike = (environment: string): boolean => {
  return !isDevelopmentLike(environment)
}
