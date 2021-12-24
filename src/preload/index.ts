import { domReady } from './utils'
import { useLoading } from './loading'

const isDev = process.env.NODE_ENV === 'development'
const { appendLoading, removeLoading } = useLoading()

window.removeLoading = removeLoading;

(async () => {
  await domReady()

  appendLoading()
})()
