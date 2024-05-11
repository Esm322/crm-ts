import { computed } from 'vue'

import { useClientsStore } from '@/stores/clients'

import type { IBooelean, INumber } from '@/models/PrimitiveModels'
import type { IClient } from '@/models/ClientModel'

export default function useFilteredClientsData(
  dirId: INumber,
  isDirId: IBooelean,
  dirFullName: INumber,
  isDirFullName: IBooelean,
  dirCreate: INumber,
  isDirCreate: IBooelean,
  dirEdit: INumber,
  isDirEdit: IBooelean
) {
  const useFilteredClients = computed<IClient[]>((): IClient[] => {
    const store = useClientsStore()

    let copyData: IClient[] = store.clientsData

    if (dirId.value === 1 && isDirId.value === true) {
      copyData = copyData.sort((clientA: IClient, clientB: IClient) => clientA.id - clientB.id)
    } else if (dirId.value === 2 && isDirId.value === true) {
      copyData = copyData.sort((clientA: IClient, clientB: IClient) => clientB.id - clientA.id)
    }

    if (isDirFullName.value === true && dirFullName.value === 1) {
      copyData = copyData.sort((clientA: IClient, clientB: IClient) =>
        clientA.secondName < clientB.secondName ? -1 : 1
      )
    } else if (isDirFullName.value === true && dirFullName.value === 2) {
      copyData = copyData.sort((clientA: IClient, clientB: IClient) =>
        clientA.secondName > clientB.secondName ? -1 : 1
      )
    }

    if (dirCreate.value === 1 && isDirCreate.value === true) {
      copyData = copyData.sort(
        (clientA: IClient, clientB: IClient) => clientA.date.nowDate - clientB.date.nowDate
      )
    } else if (dirCreate.value === 2 && isDirCreate.value === true) {
      copyData = copyData.sort(
        (clientA: IClient, clientB: IClient) => clientB.date.nowDate - clientA.date.nowDate
      )
    }

    if (dirEdit.value === 1 && isDirEdit.value === true) {
      copyData = copyData.sort(
        (clientA: IClient, clientB: IClient) => clientA.edit.nowEdit - clientB.edit.nowEdit
      )
    } else if (dirEdit.value === 2 && isDirEdit.value === true) {
      copyData = copyData.sort(
        (clientA: IClient, clientB: IClient) => clientB.edit.nowEdit - clientA.edit.nowEdit
      )
    }

    if (store.searchValueStore) {
      copyData = copyData.filter((client: IClient) => {
        return Object.values(client).some((item: string | number) =>
          item.toString().toLowerCase().includes(store.searchValueStore.toLowerCase())
        )
      })
    }

    return copyData
  })

  return {
    useFilteredClients
  }
}
