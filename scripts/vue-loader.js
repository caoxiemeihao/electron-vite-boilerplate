const { compileTemplate } = require('@vue/compiler-sfc')

module.exports = function (source) {
  const filename = this.resourcePath

  const result = compileTemplate({
    source,
    filename,
    id: filename,
  })

  return result.code
}
