import "jest-enzyme/lib/index"
import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
configure({ adapter: new Adapter() })

// Setup config file on window
const { clientConfig } = require("tsugi/commonjs/config.ts")

if (typeof window !== "undefined") {
  window.__TSUGI_CONFIG__ = clientConfig
}
