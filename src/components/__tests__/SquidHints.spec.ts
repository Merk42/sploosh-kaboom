import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SquidHints from '@/components/SquidHints.vue'

describe('SquidHints', () => {
  const defaultProps = {
    displays: {
      squid1: '1 / 1 / 1 / 3', // horizontal
      squid2: '2 / 2 / 4 / 2', // vertical
      squid3: '3 / 3 / 3 / 7', // horizontal
    },
  }

  it('renders all three squid divs', () => {
    const wrapper = mount(SquidHints, {
      props: defaultProps,
    })

    expect(wrapper.find('#squid1').exists()).toBe(true)
    expect(wrapper.find('#squid2').exists()).toBe(true)
    expect(wrapper.find('#squid3').exists()).toBe(true)
  })

  it('applies correct grid areas', () => {
    const wrapper = mount(SquidHints, {
      props: defaultProps,
    })

    expect(wrapper.find('#squid1').attributes('style')).toContain('grid-area: 1 / 1 / 1 / 3')
    expect(wrapper.find('#squid2').attributes('style')).toContain('grid-area: 2 / 2 / 4 / 2')
    expect(wrapper.find('#squid3').attributes('style')).toContain('grid-area: 3 / 3 / 3 / 7')
  })

  it('determines orientation correctly', () => {
    const wrapper = mount(SquidHints, {
      props: defaultProps,
    })

    expect(wrapper.vm.orientations.squid1).toBe('h') // 1 === 1, so horizontal
    expect(wrapper.vm.orientations.squid2).toBe('v') // 2 !== 4, so vertical
    expect(wrapper.vm.orientations.squid3).toBe('h') // 3 === 3, so horizontal
  })

  it('applies correct orientation classes', () => {
    const wrapper = mount(SquidHints, {
      props: defaultProps,
    })

    expect(wrapper.find('#squid1').classes()).toContain('h')
    expect(wrapper.find('#squid2').classes()).toContain('v')
    expect(wrapper.find('#squid3').classes()).toContain('h')
  })

  it('orientFromGrid function works correctly', () => {
    const wrapper = mount(SquidHints, {
      props: defaultProps,
    })

    expect(wrapper.vm.orientFromGrid('1 / 2 / 1 / 5')).toBe('h') // same row
    expect(wrapper.vm.orientFromGrid('1 / 2 / 4 / 2')).toBe('v') // same column
  })
})
