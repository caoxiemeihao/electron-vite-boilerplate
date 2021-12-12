
interface Window {
  /** 关闭预加载动画 */
  ClosePreloadLoading: () => void
  /** 运行时环境 */
  APP_ENV: 'development' | 'production'
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
  }
}
