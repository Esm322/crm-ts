import { describe, it, expect, beforeEach } from 'vitest'

import { shallowMount } from '@vue/test-utils'

import ClientItem from '../ClientItem.vue'

describe('ModalWindowAdd.vue', () => {
  let wrapper: any

  const mockClient = {
    id: 1,
    firstName: 'test',
    secondName: 'test',
    thirdName: 'test',
    fullName: 'test',
    date: {
      newDate: new Date(2000, 10, 10),
      nowDate: 1
    },
    edit: {
      newEdit: new Date(2000, 10, 10),
      nowEdit: 1
    },
    contacts: [
      {
        block: {
          __file:
            'C:/Users/esm32/OneDrive/Desktop/vscode/crm-vite/src/components/ModalWindowAddBlock.vue',
          __hmrId: 'ed1b12a2',
          __name: 'ModalWindowAddBlock',
          emits: ['update:selectValue', 'update:inputValue'],
          props: {
            inputValue: {
              required: true
            },
            length: {
              required: true
            },
            selectValue: {
              required: true
            }
          }
        },
        selectValue: 'test',
        inputValue: 'test'
      }
    ],
    newdCreateDate: '02.05.2024 14:08',
    newEditDate: '02.05.2024 14:08'
  }

  beforeEach(() => {
    wrapper = shallowMount(ClientItem, {
      props: {
        id: 1,
        fullName: 'test test test',
        date: '02.05.2024 14:08',
        edit: '02.05.2024 14:08',
        contacts: [],
        client: {
          id: 1,
          firstName: 'test',
          secondName: 'test',
          thirdName: 'test',
          fullName: 'test',
          date: {
            newDate: new Date(2000, 10, 10),
            nowDate: 1
          },
          edit: {
            newEdit: new Date(2000, 10, 10),
            nowEdit: 1
          },
          contacts: [
            {
              block: {
                __file:
                  'C:/Users/esm32/OneDrive/Desktop/vscode/crm-vite/src/components/ModalWindowAddBlock.vue',
                __hmrId: 'ed1b12a2',
                __name: 'ModalWindowAddBlock',
                emits: ['update:selectValue', 'update:inputValue'],
                props: {
                  inputValue: {
                    required: true
                  },
                  length: {
                    required: true
                  },
                  selectValue: {
                    required: true
                  }
                }
              },
              selectValue: 'test',
              inputValue: 'test'
            }
          ],
          newdCreateDate: '02.05.2024 14:08',
          newEditDate: '02.05.2024 14:08'
        }
      },
      global: {
        stubs: ['ClientItem']
      }
    })
  })

  it('Returns passed props', () => {
    const ClientItem = wrapper.getComponent({ name: 'ClientItem' })

    expect(ClientItem.props().id).toBe(1)
    expect(ClientItem.props().fullName).toBe('test test test')
    expect(ClientItem.props().date).toBe('02.05.2024 14:08')
    expect(ClientItem.props().edit).toBe('02.05.2024 14:08')
    expect(ClientItem.props().contacts).toStrictEqual([])
    expect(ClientItem.props().client).toStrictEqual(mockClient)
  })

  it('Contains passed props', () => {
    expect(wrapper.text()).toContain(mockClient.id)
    expect(wrapper.text()).toContain(mockClient.fullName)
    expect(wrapper.text()).toContain(mockClient.newEditDate)
    expect(wrapper.text()).toContain(mockClient.newdCreateDate)
  })
})
