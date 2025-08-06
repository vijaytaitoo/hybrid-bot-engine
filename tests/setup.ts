import { vi } from 'vitest'

// Мокаем process.env для тестов
vi.stubEnv('NODE_ENV', 'test')

// Мокаем console для тестов
global.console = {
  ...console,
  log: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
  info: vi.fn()
}

// Мокаем fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
    text: () => Promise.resolve('Mock response')
  })
)

// Глобальные тестовые утилиты
export const mockUser = {
  id: 123456789,
  username: 'testuser',
  first_name: 'Test',
  last_name: 'User'
}

export const mockMessage = {
  message_id: 1,
  from: mockUser,
  chat: { id: 123456789, type: 'private' },
  text: '/test',
  date: Date.now()
}

export const mockContext = {
  message: mockMessage,
  chat: { id: 123456789, type: 'private' },
  from: mockUser,
  reply: vi.fn(),
  api: {
    answerCallbackQuery: vi.fn(),
    editMessageText: vi.fn(),
    sendMessage: vi.fn()
  }
} as any

// Утилиты для тестирования
export const createMockContext = (overrides = {}) => ({
  ...mockContext,
  ...overrides
})

export const createMockMessage = (overrides = {}) => ({
  ...mockMessage,
  ...overrides
})

// Очистка после каждого теста
afterEach(() => {
  vi.clearAllMocks()
})
