import { createApp } from 'vue'
import App from './App.vue'
// import './samples/nodejs-api'
// import './samples/electron-store'

createApp(App)
  .mount('#app')
  .$nextTick(window.removeLoading)
