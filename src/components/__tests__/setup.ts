import { config } from '@vue/test-utils'

// Mock audio elements
global.Audio = class Audio {
  constructor() {
    this.play = vi.fn()
  }
  play = vi.fn()
}

// Mock navigator.vibrate
Object.defineProperty(navigator, 'vibrate', {
  value: vi.fn(),
  writable: true,
})

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock

// Configure Vue Test Utils
config.global.mocks = {
  $t: (key: string) => key, // Mock translation function if needed
}
