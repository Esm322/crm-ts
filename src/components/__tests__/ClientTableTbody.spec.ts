import { describe, it, expect, beforeEach } from 'vitest'

import { shallowMount } from '@vue/test-utils'

import ClientTableTbody from '../ClientTableTbody.vue'
import ClientItem from '../ClientItem.vue'

describe('ModalWindowAdd.vue', () => {
  let wrapper: any

  const ClientItemStub = {
    template: `<tbody>${ClientItem}</tbody>`
  }

  beforeEach(() => {
    wrapper = shallowMount(ClientTableTbody, {
      props: {
        clients: [
          {
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
            newdCreateDate: 'test',
            newEditDate: 'test'
          }
        ]
      },
      global: {
        stubs: {
          ClientItem: ClientItemStub
        }
      }
    })
  })

  it('Renders ClientItem component', () => {
    expect(wrapper.findComponent(ClientItemStub).exists()).toBe(true)
  })
})
