
export {}

declare global {
  interface Window {
    fs: typeof import('fs')
    path: typeof import('path')
    removeLoading: () => void
    ipcRenderer: import('electron').IpcRenderer
  }
}
