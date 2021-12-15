import { domReady } from './utils'
import { useLoading } from './loading'

const isDev = process.env.NODE_ENV === 'development'
const { appendLoading, removeLoading } = useLoading()

window.bridge = Object.assign(window.bridge || {}, {
  removeLoading,
})

; (async () => {
  await domReady()

  appendLoading()
})();
