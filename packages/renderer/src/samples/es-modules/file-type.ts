import path from 'path'
import process from 'process'
import { fileTypeFromFile } from 'file-type'

(async () => {
  const filename = process.env.NODE_ENV === 'development'
    ? path.join(process.cwd(), 'packages/renderer/public/vue.ico')
    : path.join(process.cwd(), 'dist/renderer/vue.ico')
  const fileType = await fileTypeFromFile(filename)

  // console.log(fileType) // { ext: 'ico', mime: 'image/x-icon' }
})();

