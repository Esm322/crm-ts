import { ref } from 'vue'
import { defineStore } from 'pinia'
import idCreation from '@/helpers/idCreation'
import type { IContacts } from '@/models/ObjectModels'
import type { IClient } from '@/models/ClientModel'

export const useClientsStore = defineStore('client', () => {
  const clientJson: string | null = localStorage.getItem('clients')

  const searchValueStore = ref<string>('')
  const clientsData = ref<IClient[]>([])
  clientsData.value = clientJson !== null ? JSON.parse(clientJson) : []

  function saveClients(): void {
    localStorage.setItem('clients', JSON.stringify(clientsData.value))
  }

  function addClient(
    firstName: string,
    secondName: string,
    thirdName: string,
    contacts: IContacts[]
  ): void {
    clientsData.value.push({
      id: idCreation(clientsData.value),
      firstName,
      secondName,
      thirdName,
      fullName: `${secondName} ${firstName} ${thirdName}`,
      date: {
        newDate: new Date(),
        nowDate: Date.now()
      },
      edit: {
        newEdit: new Date(),
        nowEdit: Date.now()
      },
      contacts
    })

    saveClients()
  }

  function initialContacts(id: number, contacts: IContacts[]) {
    clientsData.value.forEach((client: IClient) => {
      if (client.id === id && typeof contacts !== 'undefined') {
        client.contacts = contacts

        saveClients()
      }
    })
  }

  function changeClient(
    id: number,
    firstName: string,
    secondName: string,
    thirdName: string,
    contacts: IContacts[]
  ): void {
    clientsData.value.forEach((client: any) => {
      if (client.id === id) {
        client.firstName = firstName
        client.secondName = secondName
        client.thirdName = thirdName
        client.fullName = `${secondName} ${firstName} ${thirdName}`
        client.edit.newEdit = new Date()
        client.edit.nowEdit = Date.now()
        client.contacts = contacts

        saveClients()
      }
    })
  }

  function deleteClient(id: number): void {
    clientsData.value.forEach((client: IClient, i: number) => {
      if (client.id === id) {
        clientsData.value.splice(i, 1)

        saveClients()
      }
    })
  }

  return {
    clientsData,
    searchValueStore,
    saveClients,
    addClient,
    initialContacts,
    changeClient,
    deleteClient
  }
})
