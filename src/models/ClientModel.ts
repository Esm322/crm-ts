import type { IContacts } from './ObjectModels'
export interface IClient {
  id: number
  firstName: string
  secondName: string
  thirdName: string
  fullName: string
  date: {
    newDate: Date
    nowDate: number
  }
  edit: {
    newEdit: Date
    nowEdit: number
  }
  contacts: IContacts[]
}

export interface INewClient extends IClient {
  id: number
  newdCreateDate: string
  newEditDate: string
}
