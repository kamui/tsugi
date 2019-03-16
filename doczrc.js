import { css } from "docz-plugin-css"

module.exports = {
  title: "Docz Typescript",
  typescript: true,
  plugins: [
    css({
      preprocessor: "postcss",
      cssmodules: true,
    }),
  ],
}
