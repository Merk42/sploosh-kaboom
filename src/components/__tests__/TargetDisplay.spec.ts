import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TargetDisplay from '@/components/TargetDisplay.vue'

describe('TargetDisplay', () => {
  const defaultProps = {
    targets: [
      { name: 'squid1', length: 2 },
      { name: 'squid2', length: 0 },
      { name: 'squid3', length: 4 },
    ],
  }

  it('renders correct number of targets', () => {
    const wrapper = mount(TargetDisplay, {
      props: defaultProps,
    })

    const targets = wrapper.findAll('.target')
    expect(targets).toHaveLength(3)
  })

  it('applies dead class to targets with zero length', () => {
    const wrapper = mount(TargetDisplay, {
      props: defaultProps,
    })

    const targets = wrapper.findAll('.target')
    expect(targets[0].classes()).not.toContain('dead') // length: 2
    expect(targets[1].classes()).toContain('dead') // length: 0
    expect(targets[2].classes()).not.toContain('dead') // length: 4
  })

  it('renders squid and explosion elements for each target', () => {
    const wrapper = mount(TargetDisplay, {
      props: defaultProps,
    })

    const squids = wrapper.findAll('.squid')
    const explosions = wrapper.findAll('.explosion')

    expect(squids).toHaveLength(3)
    expect(explosions).toHaveLength(3)
  })
})
