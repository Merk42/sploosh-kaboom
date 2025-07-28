import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WaterRipples from '@/components/WaterRipples.vue'

describe('WaterRipples', () => {
  it('renders svg when animate is true', () => {
    const wrapper = mount(WaterRipples, {
      props: {
        animate: true,
      },
    })

    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('does not render svg when animate is false', () => {
    const wrapper = mount(WaterRipples, {
      props: {
        animate: false,
      },
    })

    expect(wrapper.find('svg').exists()).toBe(false)
  })

  it('always renders the image div', () => {
    const wrapper = mount(WaterRipples, {
      props: {
        animate: false,
      },
    })

    expect(wrapper.find('.image').exists()).toBe(true)
  })

  it('defaults animate to true', () => {
    const wrapper = mount(WaterRipples)

    expect(wrapper.vm.animate).toBe(true)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders filter elements when animated', () => {
    const wrapper = mount(WaterRipples, {
      props: {
        animate: true,
      },
    })

    expect(wrapper.find('filter#warp').exists()).toBe(true)
    expect(wrapper.find('feTurbulence').exists()).toBe(true)
    expect(wrapper.find('feDisplacementMap').exists()).toBe(true)
  })
})
