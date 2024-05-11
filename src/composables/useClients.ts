import { computed } from 'vue'
import dateCreation from '@/helpers/dateCreation'
import dateChange from '@/helpers/dateChange'
import type { IClient, INewClient } from '@/models/ClientModel'

type TClients = {
  value: IClient[]
}

export default function useClientsData(clients: TClients) {
  const useClients = computed<INewClient[]>((): INewClient[] => {
    return clients.value
      ? clients.value.map((client: IClient) => {
          return {
            ...client,
            id: client.id,
            fullName: `${client.secondName} ${client.firstName} ${client.thirdName}`,
            newdCreateDate: dateCreation(client.date.newDate),
            newEditDate: dateChange(client.edit.newEdit)
          }
        })
      : []
  })

  return {
    useClients
  }
}
