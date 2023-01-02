import { spawn } from 'child_process'
import { createServer, build } from 'vite'
import electron from 'electron'

const parsed = new URL(import.meta.url)

if (parsed.searchParams.get('debug')) { // vscode
  Object.assign(process.env, { VSCODE_DEBUG: 'true' })
}

/**
 * @type {(server: import('vite').ViteDevServer) => Promise<import('rollup').RollupWatcher>}
 */
function watchMain(server) {
  /** @type {import('net').AddressInfo} */
  const address = server.httpServer.address()
  const env = Object.assign(process.env, {
    VITE_DEV_SERVER_HOSTNAME: address.address,
    VITE_DEV_SERVER_PORT: address.port,
    VITE_DEV_SERVER_URL: `http://${address.address}:${address.port}`
  })

  return build({
    configFile: 'packages/main/vite.config.ts',
    mode: 'development',
    plugins: [process.env.VSCODE_DEBUG ? null : {
      name: 'electron-main-watcher',
      closeBundle() {
        if (process.electronApp) {
          process.electronApp.removeAllListeners()
          process.electronApp.kill()
        }
        process.electronApp = spawn(electron, ['.'], { stdio: 'inherit', env })
        process.electronApp.once('exit', process.exit)
      },
    }].filter(Boolean),
    build: {
      watch: {},
    },
  })
}

/**
 * @type {(server: import('vite').ViteDevServer) => Promise<import('rollup').RollupWatcher>}
 */
function watchPreload(server) {
  return build({
    configFile: 'packages/preload/vite.config.ts',
    mode: 'development',
    plugins: [{
      name: 'electron-preload-watcher',
      closeBundle() {
        server.ws.send({ type: 'full-reload' })
      },
    }],
    build: {
      watch: {},
    },
  })
}

// bootstrap
const server = await createServer({ configFile: 'packages/renderer/vite.config.ts' })
await server.listen()
server.printUrls()

await watchPreload(server)
await watchMain(server)
