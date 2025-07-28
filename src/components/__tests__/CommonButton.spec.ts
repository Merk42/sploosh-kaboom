import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CommonButton from '@/components/CommonButton.vue'

describe('CommonButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(CommonButton, {
      slots: {
        default: 'Click me',
      },
    })

    expect(wrapper.text()).toBe('Click me')
  })

  it('emits click event when clicked and not disabled', async () => {
    const wrapper = mount(CommonButton)

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click event when disabled', async () => {
    const wrapper = mount(CommonButton, {
      props: {
        disabled: true,
      },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('applies default props correctly', () => {
    const wrapper = mount(CommonButton)

    expect(wrapper.vm.variant).toBe('primary')
    expect(wrapper.vm.size).toBe('medium')
    expect(wrapper.vm.disabled).toBe(false)
  })
})
