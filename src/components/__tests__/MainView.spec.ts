import { describe, it, expect, beforeEach, vi } from 'vitest'

import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import MainView from '@/views/MainView.vue'

describe('MainView.vue', () => {
  let wrapper: any

  const mockClient = {
    firstName: 'test',
    secondName: 'test',
    thirdName: 'test'
  }

  beforeEach(() => {
    wrapper = mount(MainView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              clientsData: [mockClient]
            }
          })
        ]
      }
    })
  })

  it('Openning modal window add', async () => {
    await wrapper.find('#add').trigger('click')

    expect(wrapper.find('#modal').exists()).toBe(true)
  })

  it('Exit from modal window add', async () => {
    await wrapper.find('#add').trigger('click')
    await wrapper.find('#btn-cancel').trigger('click')

    expect(wrapper.find('#modal').exists()).toBe(false)
  })

  it('Input firstname, secondname and transmits update event', async () => {
    await wrapper.find('#add').trigger('click')
    await wrapper.find('#input-firstname').setValue('test')
    await wrapper.find('#input-secondname').setValue('test')
    await wrapper.find('#btn-save').trigger('click')

    expect(wrapper.find('#modal').exists()).toBe(false)
  })
})
