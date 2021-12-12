import { Stats } from 'webpack'

export type callbackFunction = (tag: string, cb?: (bool: boolean) => void)
  => (error: Error, stats: Stats)
    => void
