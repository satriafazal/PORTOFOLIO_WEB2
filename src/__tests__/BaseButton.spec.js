import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '@/components/common/BaseButton.vue'

describe('BaseButton Component', () => {
  it('renders slot content correctly', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Klik Saya'
      }
    })
    expect(wrapper.text()).toContain('Klik Saya')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(BaseButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click').length).toBe(1)
  })

  it('renders loading spinner when loading is true', () => {
    const wrapper = mount(BaseButton, {
      props: {
        loading: true
      }
    })
    expect(wrapper.find('svg.animate-spin').exists()).toBe(true)
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })
})
