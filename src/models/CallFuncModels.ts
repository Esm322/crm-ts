import type { INewClient } from './ClientModel'

export interface ICallBoolean {
  (): boolean
}

export interface ICallNumber {
  (value: number): number
}

export interface ICallClient {
  (value: INewClient): INewClient
}

export interface ICallNull {
  (): null
}

export interface ICallVoid {
  (): void
}
