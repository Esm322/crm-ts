import { describe, it, expect, beforeEach, vi } from 'vitest'

import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import ModalWindowAdd from '../ModalWindowAdd.vue'

describe('ModalWindowAdd.vue', () => {
  let wrapper: any

  const mockCLient = [
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

  beforeEach(() => {
    wrapper = mount(ModalWindowAdd, {
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
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ]
      }
    })
  })

  it('Returns passed props', () => {
    expect(wrapper.props().clients).toStrictEqual(mockCLient)
  })

  it('Set values for inputs firstname, secondname, thirdname and number field', async () => {
    wrapper.find('#input-firstname').setValue('test')
    wrapper.find('#input-secondname').setValue('test')
    wrapper.find('#input-thirdname').setValue('test')
    await wrapper.find('#add-contact__add-btn').trigger('click')
    wrapper.find('.add-contact__input').setValue('9999999999')
  })
})
