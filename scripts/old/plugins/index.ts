import path from 'path'
import acorn from 'acorn'
import fs from 'fs'
import { Plugin as VitePlugin } from 'vite'
import { extensions } from './utils'

export function esm2cjs(moduleList: string[]): VitePlugin {
  return {
    name: 'cxmh:esm2cjs',
    transform(code, id) {
      const parsed = path.parse(id)
      if (!extensions.includes(parsed.ext)) return

      const node: any = acorn.parse(code, {
        ecmaVersion: 'latest',
        sourceType: 'module',
      })

      let codeRet = code
      node.body.reverse().forEach((item) => {
        if (item.type !== 'ImportDeclaration') return
        if (!moduleList.includes(item.source.value)) return // 跳过不要转换的模块

        const statr = codeRet.substring(0, item.start)
        const end = codeRet.substring(item.end)
        const deft = item.specifiers.find(({ type }) => type === 'ImportDefaultSpecifier')
        const deftModule = deft ? deft.local.name : ''
        const nameAs = item.specifiers.find(({ type }) => type === 'ImportNamespaceSpecifier')
        const nameAsModule = nameAs ? nameAs.local.name : ''
        const modules = item.
          specifiers
          .filter((({ type }) => type === 'ImportSpecifier'))
          .reduce((acc, cur) => acc.concat(cur.imported.name), [])

        if (nameAsModule) {
          // import * as name from
          codeRet = `${statr}const ${nameAsModule} = require(${item.source.raw})${end}`
        } else if (deftModule && !modules.length) {
          // import name from 'mod'
          codeRet = `${statr}const ${deftModule} = require(${item.source.raw})${end}`
        } else if (deftModule && modules.length) {
          // import name, { name2, name3 } from 'mod'
          codeRet = `${statr}const ${deftModule} = require(${item.source.raw})
const { ${modules.join(', ')} } = ${deftModule}${end}`
        } else {
          // import { name1, name2 } from 'mod'
          codeRet = `${statr}const { ${modules.join(', ')} } = require(${item.source.raw})${end}`
        }
      })

      return codeRet
    },
  }
}
