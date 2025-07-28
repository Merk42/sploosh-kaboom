import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AmmoDisplay from '@/components/AmmoDisplay.vue'

describe('AmmoDisplay', () => {
  it('renders correct number of ammo items', () => {
    const wrapper = mount(AmmoDisplay, {
      props: {
        total: 5,
        remaining: 3,
      },
    })

    const spans = wrapper.findAll('span')
    expect(spans).toHaveLength(5)
  })

  it('applies index class correctly based on used ammo', () => {
    const wrapper = mount(AmmoDisplay, {
      props: {
        total: 5,
        remaining: 2,
      },
    })

    const spans = wrapper.findAll('span')
    // Used ammo = 5 - 2 = 3, so index should be at position 3 (0-based)
    expect(spans[3].classes()).toContain('index')
  })

  it('computes used ammo correctly', () => {
    const wrapper = mount(AmmoDisplay, {
      props: {
        total: 10,
        remaining: 7,
      },
    })

    expect(wrapper.vm.used).toBe(3)
  })
})
