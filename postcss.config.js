// const fs = require("fs")

module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-preset-env": {
      stage: 1
    },
    "postcss-assets": {
      loadPaths: ["static/"]
    },
    "postcss-mixins": {},
    "postcss-custom-properties": {},
    "postcss-nested": {},
    "postcss-normalize": {}
  }
}
