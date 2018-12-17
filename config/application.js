import { fromJS } from "immutable"
import { isServer } from "tsugi/utils/client"
import serverRequire from "tsugi/utils/server_require"

// All config settings are set in commonjs/config
//
// On server, settings are read directly from the process
// On client, settings are read from the window object __TSUGI_CONFIG__

let clientConfig

export default function() {
  if (isServer) {
    return serverRequire("tsugi/commonjs/config")
  }

  // Set client config as immutable first time called to avoid mutation
  clientConfig = clientConfig || fromJS(window.__TSUGI_CONFIG__)

  return clientConfig.toJS()
}
