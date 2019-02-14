import { isServer } from "tsugi/utils/client.ts"
import serverRequire from "tsugi/utils/server_require.ts"

// All config settings are set in commonjs/config
//
// On server, settings are read directly from the process
// On client, settings are read from the window object __TSUGI_CONFIG__

let clientConfig

export default function() {
  if (isServer) {
    return serverRequire("tsugi/commonjs/config.ts")
  }

  clientConfig = clientConfig || window.__TSUGI_CONFIG__

  return clientConfig
}
