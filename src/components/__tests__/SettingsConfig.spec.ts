import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SettingsConfig from '@/components/SettingsConfig.vue'

describe('SettingsConfig', () => {
  const defaultProps = {
    settings: {
      shake: true,
      vibrate: true,
      animate: true,
      sound: true,
    },
  }

  it('renders settings button', () => {
    const wrapper = mount(SettingsConfig, {
      props: defaultProps,
    })

    expect(wrapper.find('button').text()).toBe('settings')
  })

  it('renders all settings checkboxes', () => {
    const wrapper = mount(SettingsConfig, {
      props: defaultProps,
    })

    const checkboxes = wrapper.findAll('input[type="checkbox"]')
    expect(checkboxes).toHaveLength(4)
  })

  it('copies props to internal settings when opened', () => {
    const wrapper = mount(SettingsConfig, {
      props: {
        settings: {
          shake: false,
          vibrate: true,
          animate: false,
          sound: true,
        },
      },
    })

    wrapper.vm.copyProps()

    expect(wrapper.vm.settings.shake).toBe(false)
    expect(wrapper.vm.settings.vibrate).toBe(true)
    expect(wrapper.vm.settings.animate).toBe(false)
    expect(wrapper.vm.settings.sound).toBe(true)
  })

  it('emits save event with settings', () => {
    const wrapper = mount(SettingsConfig, {
      props: defaultProps,
    })

    wrapper.vm.saveChanges()

    expect(wrapper.emitted('save')).toHaveLength(1)
    expect(wrapper.emitted('save')?.[0][0]).toEqual(wrapper.vm.settings)
  })

  it('updates checkbox states correctly', async () => {
    const wrapper = mount(SettingsConfig, {
      props: defaultProps,
    })

    const shakeCheckbox = wrapper.findAll('input[type="checkbox"]')[0]

    // Initially should be checked (true)
    expect(wrapper.vm.settings.shake).toBe(true)

    // Uncheck it
    await shakeCheckbox.setValue(false)
    expect(wrapper.vm.settings.shake).toBe(false)
  })
})
