import { spawn } from 'child_process'
import { createServer, build } from 'vite'
import electron from 'electron'

/**
 * @type {(server: import('vite').ViteDevServer) => Promise<import('rollup').RollupWatcher>}
 */
function watchMain(server) {
  const address = server.httpServer.address()
  const env = Object.assign(process.env, {
    VITE_DEV_SERVER_HOST: address.address,
    VITE_DEV_SERVER_PORT: address.port,
  })

  return build({
    configFile: 'packages/main/vite.config.ts',
    mode: 'development',
    plugins: [{
      name: 'electron-main-watcher',
      writeBundle() {
        if (process.electronApp) {
          process.electronApp.removeAllListeners()
          process.electronApp.kill()
        }
        process.electronApp = spawn(electron, ['.'], { stdio: 'inherit', env })
        process.electronApp.once('exit', process.exit)
      },
    }],
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
      writeBundle() {
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
await watchPreload(server)
await watchMain(server)
