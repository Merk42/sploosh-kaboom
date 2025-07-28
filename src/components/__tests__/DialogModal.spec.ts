import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DialogModal from '@/components/DialogModal.vue'

// Mock HTMLDialogElement methods
Object.defineProperty(window, 'HTMLDialogElement', {
  value: function () {
    return {
      showModal: vi.fn(),
      close: vi.fn(),
    }
  },
})

describe('DialogModal', () => {
  it('renders title correctly', () => {
    const wrapper = mount(DialogModal, {
      props: {
        title: 'Test Modal',
      },
    })

    expect(wrapper.find('h1 span').text()).toBe('Test Modal')
  })

  it('renders slot content', () => {
    const wrapper = mount(DialogModal, {
      slots: {
        default: '<p>Modal content</p>',
      },
    })

    expect(wrapper.find('main').html()).toContain('<p>Modal content</p>')
  })

  it('shows confirm button by default', () => {
    const wrapper = mount(DialogModal, {
      props: {
        confirmText: 'Save',
      },
    })

    const confirmButton = wrapper.findAll('button').find((btn) => btn.text() === 'Save')
    expect(confirmButton).toBeTruthy()
  })

  it('hides confirm button when hideConfirm is true', () => {
    const wrapper = mount(DialogModal, {
      props: {
        hideConfirm: true,
        confirmText: 'Save',
      },
    })

    const confirmButton = wrapper.findAll('button').find((btn) => btn.text() === 'Save')
    expect(confirmButton).toBeFalsy()
  })

  it('shows cancel button when showCancel is true', () => {
    const wrapper = mount(DialogModal, {
      props: {
        showCancel: true,
        cancelText: 'Cancel',
      },
    })

    const cancelButton = wrapper.findAll('button').find((btn) => btn.text() === 'Cancel')
    expect(cancelButton).toBeTruthy()
  })

  it.skip('emits confirm event when confirm button is clicked', async () => {
    const wrapper = mount(DialogModal, {
      props: {
        confirmText: 'Confirm',
      },
    })

    const confirmButton = wrapper.findAll('button').find((btn) => btn.text() === 'Confirm')
    await confirmButton?.trigger('click')

    expect(wrapper.emitted('confirm')).toHaveLength(1)
  })

  it.skip('emits cancel event when cancel button is clicked', async () => {
    const wrapper = mount(DialogModal, {
      props: {
        showCancel: true,
        cancelText: 'Cancel',
      },
    })

    const cancelButton = wrapper.findAll('button').find((btn) => btn.text() === 'Cancel')
    await cancelButton?.trigger('click')

    expect(wrapper.emitted('cancel')).toHaveLength(1)
  })
})
