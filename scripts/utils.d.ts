import { Compiler } from 'webpack'

export type CallbackFunction = (tag: string, cb?: (bool: boolean) => void)
  => Parameters<Compiler['run']>[0]

export const callbackFunction: CallbackFunction
