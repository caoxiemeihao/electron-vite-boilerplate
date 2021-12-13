import { Stats } from 'webpack'

export type CallbackFunction = (tag: string, cb?: (bool: boolean) => void)
  => (error: Error, stats: Stats)
    => void

export const callbackFunction: CallbackFunction
