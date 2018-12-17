module.exports = {
  "moduleNameMapper": {
    ".+\\.(css|pcss)$": "identity-obj-proxy",
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tests/mocks/file_mock.js",
    "^tsugi/(.+)": "<rootDir>$1"
  },
  "setupFiles": [
    "raf/polyfill",
    "jest-localstorage-mock"
  ],
  "setupTestFrameworkScriptFile": "./tests/setup_test_framework_script_file.js",
  "testURL": "http://localhost",
  "testPathIgnorePatterns": [
    "/node_modules/",
    "/cypress",
  ],
}
