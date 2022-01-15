import electron from 'electron';
import cp from 'child_process';
import { createRequire } from 'module';
import { createServer, build } from 'vite';
import { main, preload } from './vite.config.mjs';
const pkg = createRequire(import.meta.url)('../package.json');

/**
 * @param {import('vite').ViteDevServer} server 
 */
function watchPreload(server) {
  preload.build.watch = true;
  preload.plugins = [{
    name: 'electron-preload-watcher',
    writeBundle() {
      server.ws.send({ type: 'full-reload' });
    },
  }].concat(preload.plugins).filter(Boolean);

  return build(preload);
}

function watchMain() {
  /**
   * @type {import('child_process').ChildProcessWithoutNullStreams | null}
   */
  let electronProcess = null;

  main.build.watch = true;
  main.plugins = [{
    name: 'electron-main-watcher',
    writeBundle() {
      electronProcess && electronProcess.kill();
      electronProcess = cp.spawn(electron, ['.'], {
        env: Object.assign(process.env, pkg.env),
        stdio: 'inherit',
      });
    },
  }].concat(main.plugins).filter(Boolean);

  return build(main);
}

// bootstrap
const server = await createServer({ configFile: 'src/renderer/vite.config.ts' });
await server.listen(pkg.env.PORT);
await watchPreload(server);
await watchMain();
