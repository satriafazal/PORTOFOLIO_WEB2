import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from '@/components/common/SearchBar.vue'

describe('SearchBar Component', () => {
  it('renders input with correct placeholder', () => {
    const wrapper = mount(SearchBar, {
      props: {
        placeholder: 'Cari proyek...'
      }
    })
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Cari proyek...')
  })

  it('emits update:modelValue on typing', async () => {
    const wrapper = mount(SearchBar, {
      props: {
        modelValue: ''
      }
    })
    const input = wrapper.find('input')
    await input.setValue('Vue 3')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Vue 3'])
  })

  it('shows clear button only when modelValue is present and emits clear', async () => {
    const wrapper = mount(SearchBar, {
      props: {
        modelValue: 'IoT'
      }
    })
    const clearBtn = wrapper.find('button')
    expect(clearBtn.exists()).toBe(true)

    await clearBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([''])
    expect(wrapper.emitted('clear')).toBeTruthy()
  })
})
