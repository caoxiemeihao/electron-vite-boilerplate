import { app } from 'electron'
import path from 'path'
import { fileTypeFromFile } from 'file-type'

(async () => {
  const filename = app.isPackaged
    ? path.join(__dirname, '../renderer/vue.ico')
    : path.join(__dirname, '../../packages/renderer/public/vue.ico')
  const fileType = await fileTypeFromFile(filename)

  // console.log(fileType) // { ext: 'ico', mime: 'image/x-icon' }
})()
