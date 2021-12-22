const electron = require('electron');
const cp = require('child_process');
const esbuild = require('esbuild');
const vite = require('vite');
const { mainOptions, preloadOptions } = require('./esbuild');
const pkg = require('../package.json');

function watchMain() {
  /**
   * @type {import('child_process').ChildProcessWithoutNullStreams | null}
   */
  let electronProcess = null;
  const startElectron = () => {
    electronProcess && electronProcess.kill();
    electronProcess = cp.spawn(electron, ['.'], {
      env: Object.assign(process.env, pkg.env),
      stdio: 'inherit',
    });
  };

  esbuild.build(mainOptions(startElectron));
  startElectron();
}

/**
 * @param {import('vite').ViteDevServer} server 
 */
function watchPreload(server) {
  esbuild.build(preloadOptions(() => {
    server.ws.send({ type: 'full-reload' });
  }));
}

// bootstrap
(async () => {
  const server = await vite.createServer({ configFile: 'src/renderer/vite.config.ts' })
  await server.listen(pkg.env.PORT);
  watchPreload(server);
  watchMain();
})();
