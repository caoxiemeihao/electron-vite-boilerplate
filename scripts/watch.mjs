import electron from 'electron';
import cp from 'child_process';
import { createRequire } from 'module';
import esbuild from 'esbuild';
import vite from 'vite';
import { mainOptions, preloadOptions } from './esbuild.mjs';
const pkg = createRequire(import.meta.url)('../package.json');

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
