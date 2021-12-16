import { builtinModules } from 'module'
import { Plugin as VitePlugin } from 'vite'

export const builtins = [
  'electron',
  ...builtinModules,
]

export interface Options {
  /**
   * Whether resolve 'require('module').builtinModules'
   * If you use NodeJs API like 'path', 'fs' module, this options ensure they can be correct resolve.

   * @description What can you do if you don't understand this optons. Just set 'ture'.
   */
  builtinModulesResolve: boolean
}

export function electron(options: Options): VitePlugin | VitePlugin[] {
  const cleanUrl = (url: string) => url.replace(/\?.*$/s, '').replace(/#.*$/s, '')
  const isLoadElectron = (id: string) => {
    const cid = cleanUrl(id)
    // pre-build: 'node_modules/.vite/electron.js'
    // pnpm     : 'node_modules/.pnpm/electron@16.0.2/node_modules/electron/index.js'
    // yarn     : 'node_modules/electron/index.js'
    // npm      : 'node_modules/electron/index.js'
    return cid.endsWith('electron/index.js') || cid.endsWith('.vite/electron.js')
  }

  const electronResolve: VitePlugin = {
    name: 'vitejs-plugin-electron:electron-resolve',
    apply: 'serve',
    transform(code, id) {
      if (isLoadElectron(id)) {
        const electronPath = require('electron')
        const electronModule = `
/**
 * All exports module see https://www.electronjs.org -> API -> Renderer Process Modules
 */
const {
  clipboard,
  contextBridge,
  crashReporter,
  desktopCapturer,
  ipcRenderer,
  nativeImage,
  webFrame,
} = require('electron');

const electronPath = '${electronPath}';

export {
  electronPath as default,
  clipboard,
  contextBridge,
  crashReporter,
  desktopCapturer,
  ipcRenderer,
  nativeImage,
  webFrame,
}
`

        return {
          code: electronModule,
          map: null,
        }
      }

      return null
    }
  }

  const builtinModulesResolve: VitePlugin = {
    apply: 'serve',
    name: 'vitejs-plugin-electron:builtinModules-resolve',
    transform(code, id) {
      if (id.includes('__vite-browser-external')) {
        const moduleId = id.split(':')[1];
        if (builtinModules.includes(moduleId)) {
          const nodeModule = require(moduleId)
          const attrs = Object.keys(nodeModule)
          const requireTpl = `const __nodeModule = require('${moduleId}');`
          const declaresTpl = attrs.map(attr => `const ${attr} = __nodeModule.${attr}`).join(';\n') + ';'
          const exportTpl = `export {\n  ${attrs.join(',\n  ')},\n}`
          const exportDefault = `export default { ${attrs.join(', ')} };`

          const nodeModuleCode = `
${requireTpl}

${declaresTpl}

${exportTpl}

${exportDefault}

`

          return {
            code: nodeModuleCode,
            map: null,
          }
        }
      }

      return null
    },
  }

  return options.builtinModulesResolve
    ? [electronResolve, builtinModulesResolve]
    : electronResolve
}


export default electron
