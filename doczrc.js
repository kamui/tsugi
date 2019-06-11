import { css } from "docz-plugin-css"

export default {
  title: "Docz Typescript",
  typescript: true,
  plugins: [
    css({
      preprocessor: "postcss",
      cssmodules: true,
    }),
  ],
}
